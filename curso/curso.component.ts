import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //vetor de cursos
  vetor!:Curso[];

  //Objeto da classe Curso
  curso = new Curso();

  //construtor
  constructor(private cursoServico:CursoService) { }

  //inicializador
  ngOnInit(): void {
    //Ao iniciar o sistema, disponibiliza os cursos
    this.selecao();
  }
  //Cadastrar
  cadastro(curso: Curso){
    this.cursoServico.cadastrarCurso(this.curso).subscribe(
      (res:Curso[])=>{
        //adicionar dados
        this.vetor = res;

        //limpar campos
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        //atualizar lista
        this.selecao();
      }
    )
  }


  //Selecao
  selecao(){
    this.cursoServico.obterCursos().subscribe(
      (res: any)=> {
        this.vetor = res
      }
    );
  }

  //Alterar
  alterar(curso: Curso){
    console.log(curso);
    this.cursoServico.atualizarCurso(curso).subscribe(
      (res) => {
        this.vetor = res;

        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        this.selecao();
      }
    )
  }

  //Remover
  remover(curso: Curso){
    this.cursoServico.removerCurso(this.curso).subscribe(
      (res: Curso[]) => {
        this.vetor = res;

        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        this.selecao();
      }
    )
  }

  //selecionar curso especifico
  selecionarCurso(c: Curso){
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }
}