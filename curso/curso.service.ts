import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})

export class CursoService {
  //url
  url:string = "http://localhost/api/php/";

  //vetor
  vetor!: Curso[];

  //contrutor
  constructor(private http: HttpClient) { }

  //obter todos os cursos
  obterCursos():Observable<Curso[]>{
    return this.http.get(this.url+"listar")
      .pipe(
        map((res: any) => {
          this.vetor = res.cursos;
          return this.vetor;
        })
    )
  }

  //cadastrar cursos
  cadastrarCurso(c:Curso):Observable<Curso[]>{
    return this.http.post(this.url+'cadastrar', {curso:c})
    .pipe(map((res: any) => {
      this.vetor.push(res.cursos);
      return this.vetor;
    }))
  }

  //remover o curso
  removerCurso(c: Curso): Observable<Curso[]>{
    const params = new HttpParams().set("idCurso", c.idCurso!);

    return this.http.delete(this.url + 'excluir', {params: params}).pipe(
      map((res: any) => {
        const filtro = this.vetor.filter((curso)=>{
          return curso.idCurso !== c.idCurso;
        });
        return this.vetor = filtro;
      })
    )
  }

  //alterar Curso
  atualizarCurso(c: Curso){
    const params = new HttpParams().set("idCurso", c.idCurso!);

    return this.http.put(this.url+'alterar', {sursos: c})
    .pipe(map((res:any) => {
      const cursoAlterado = this.vetor
      .find((item) => {
        return item.idCurso === 6;
      });
      if(cursoAlterado){
        cursoAlterado.nomeCurso = c.nomeCurso;
        cursoAlterado.valorCurso = c.valorCurso;
      }
      return this.vetor;
    }))
  }
}