// ==================================
// CONFIGURAÇÃO DO SUPABASE
// ==================================

const SUPABASE_URL = "https://xbxsuyanmzidjmvmwlbb.supabase.co";
const SUPABASE_KEY = "sb_publishable_ohfBqYslWeF4Yd2YeBvnLw_pp7zE9tV";

// Conexão com o banco de dados
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// ==================================
// ELEMENTOS DA TELA
// ==================================

const formLogin = document.getElementById("formLogin");
const telaLogin = document.getElementById("login");
const painel = document.getElementById("painel");
const usuarioLogado = document.getElementById("usuarioLogado");
const btnSair = document.getElementById("btnSair");
const btnProfessores = document.getElementById("btnProfessores");
const telaProfessores = document.getElementById("telaProfessores");
const btnVoltarProfessores = document.getElementById("btnVoltarProfessores");

const btnDisciplinas = document.getElementById("btnDisciplinas");
const telaDisciplinas = document.getElementById("telaDisciplinas");
const btnVoltarDisciplinas = document.getElementById("btnVoltarDisciplinas");

const btnCursos = document.getElementById("btnCursos");
const telaCursos = document.getElementById("telaCursos");
const btnVoltarCursos = document.getElementById("btnVoltarCursos");
const formDisciplina = document.getElementById("formDisciplina");
const listaDisciplinas = document.getElementById("listaDisciplinas");
const cursoDisciplina = document.getElementById("cursoDisciplina");
const formCurso = document.getElementById("formCurso");
const listaCursos = document.getElementById("listaCursos");
const btnSalas = document.getElementById("btnSalas");
const btnDisponibilidade = document.getElementById("btnDisponibilidade");
const telaDisponibilidade = document.getElementById("telaDisponibilidade");
const btnVoltarDisponibilidade = document.getElementById("btnVoltarDisponibilidade");
const formDisponibilidade = document.getElementById("formDisponibilidade");
const listaDisponibilidades = document.getElementById("listaDisponibilidades");
const btnVinculos = document.getElementById("btnVinculos");
const telaVinculos = document.getElementById("telaVinculos");
const btnVoltarVinculos = document.getElementById("btnVoltarVinculos");
const formVinculo = document.getElementById("formVinculo");
const listaVinculos = document.getElementById("listaVinculos");
const telaSalas = document.getElementById("telaSalas");
const btnVoltarSalas = document.getElementById("btnVoltarSalas");
const formSala = document.getElementById("formSala");
const listaSalas = document.getElementById("listaSalas");
// ELEMENTOS DA TELA DE TURMAS
const btnTurmas = document.getElementById("btnTurmas");
const telaTurmas = document.getElementById("telaTurmas");
const btnVoltarTurmas = document.getElementById("btnVoltarTurmas");
const formTurma = document.getElementById("formTurma");
const listaTurmas = document.getElementById("listaTurmas");

// ELEMENTOS DA TELA DE GRADE SEMANAL
const btnGrade = document.getElementById("btnGrade");
const telaGrade = document.getElementById("telaGrade");
const btnVoltarGrade = document.getElementById("btnVoltarGrade");
const formGrade = document.getElementById("formGrade");
const listaGrade = document.getElementById("listaGrade");

// ELEMENTOS DA TELA DE RELATÓRIOS
const btnRelatorios = document.getElementById("btnRelatorios");
const telaRelatorios = document.getElementById("telaRelatorios");
const btnVoltarRelatorios = document.getElementById("btnVoltarRelatorios");
const btnGerarRelatorio = document.getElementById("btnGerarRelatorio");
const tipoRelatorio = document.getElementById("tipoRelatorio");
const resultadoRelatorio = document.getElementById("resultadoRelatorio");
const btnExportarRelatorio = document.getElementById("btnExportarRelatorio");

// ELEMENTOS DAS SUGESTÕES AUTOMÁTICAS
const btnGerarSugestoes = document.getElementById("btnGerarSugestoes");
const listaSugestoes = document.getElementById("listaSugestoes");

// ==================================
// NAVEGAÇÃO - PROFESSORES
// ==================================

btnProfessores.addEventListener("click", function() {
    painel.hidden = true;
    telaProfessores.hidden = false;
    
    carregarProfessores();
});

btnVoltarProfessores.addEventListener("click", function() {
    telaProfessores.hidden = true;
    painel.hidden = false;
});

// ==================================
// NAVEGAÇÃO - DISCIPLINAS
// ==================================

btnDisciplinas.addEventListener("click", function() {
    painel.hidden = true;
    telaDisciplinas.hidden = false;

carregarCursosFormulario();
carregarDisciplinas();
});

btnVoltarDisciplinas.addEventListener("click", function() {
    telaDisciplinas.hidden = true;
    painel.hidden = false;
});

// ==================================
// NAVEGAÇÃO - CURSOS
// ==================================

btnCursos.addEventListener("click", function() {
    painel.hidden = true;
    telaCursos.hidden = false;

    carregarCursos();
});

btnVoltarCursos.addEventListener("click", function() {
    telaCursos.hidden = true;
    painel.hidden = false;
});

// ==================================
// NAVEGAÇÃO - SALAS
// ==================================

btnSalas.addEventListener("click", function() {
    painel.hidden = true;
    telaSalas.hidden = false;
    carregarSalas();
});

btnVoltarSalas.addEventListener("click", function() {
    telaSalas.hidden = true;
    painel.hidden = false;
});

btnDisponibilidade.addEventListener("click", function() {
    painel.hidden = true;
    telaDisponibilidade.hidden = false;
    carregarProfessoresDisponibilidade();
    carregarDisponibilidades();
});

// NAVEGAÇÃO DA TELA DE TURMAS
btnTurmas.addEventListener("click", function() {
    painel.hidden = true;
    telaTurmas.hidden = false;

    carregarCursosTurma();
    carregarTurmas();
});

btnVoltarTurmas.addEventListener("click", function() {
    telaTurmas.hidden = true;
    painel.hidden = false;
});

// NAVEGAÇÃO DA GRADE SEMANAL
btnGrade.addEventListener("click", function() {
    painel.hidden = true;
    telaGrade.hidden = false;

    carregarOpcoesGrade();
    carregarGrade();
    listaSugestoes.replaceChildren();
});

btnVoltarGrade.addEventListener("click", function() {
    telaGrade.hidden = true;
    painel.hidden = false;
});

// NAVEGAÇÃO DA TELA DE RELATÓRIOS
btnRelatorios.addEventListener("click", function() {
    painel.hidden = true;
    telaRelatorios.hidden = false;
});

btnVoltarRelatorios.addEventListener("click", function() {
    telaRelatorios.hidden = true;
    painel.hidden = false;
});


// CARREGAR DISPONIBILIDADES CADASTRADAS


async function carregarDisponibilidades() {

    listaDisponibilidades.textContent = "Carregando disponibilidades...";

    const { data, error } = await supabaseClient
        .from("disponibilidades")
        .select("*")
        .order("dia_semana");

    if (error) {
        listaDisponibilidades.textContent = "Erro ao carregar disponibilidades.";
        alert("Erro: " + error.message);
        return;
    }

    listaDisponibilidades.replaceChildren();

    if (data.length === 0) {
        listaDisponibilidades.textContent = "Nenhuma disponibilidade cadastrada.";
        return;
    }

    const { data: professores, error: erroProfessores } = await supabaseClient
        .from("professores")
        .select("id, nome");

    if (erroProfessores) {
        alert("Erro ao carregar nomes dos professores: " + erroProfessores.message);
        return;
    }

    data.forEach(function(disponibilidade) {

        const professor = professores.find(function(item) {
            return item.id === disponibilidade.professor_id;
        });

        const item = document.createElement("div");
        const nome = document.createElement("p");
        const dia = document.createElement("p");
        const horario = document.createElement("p");
        const restricao = document.createElement("p");
        const status = document.createElement("p");

        nome.textContent = "Professor: " + (professor ? professor.nome : "Não encontrado");
        dia.textContent = "Dia: " + disponibilidade.dia_semana;
        horario.textContent = "Horário: " + disponibilidade.horario_inicio + " às " + disponibilidade.horario_fim;
        restricao.textContent = "Restrições: " + (disponibilidade.restricoes || "Nenhuma");
        status.textContent = "Status: " + disponibilidade.status;

        if (disponibilidade.status === "Pendente") {

            const botaoAprovar = document.createElement("button");

            botaoAprovar.textContent = "Aprovar disponibilidade";
            botaoAprovar.style.background = "#16A34A";

            botaoAprovar.addEventListener("click", async function() {

                const { error } = await supabaseClient
                    .from("disponibilidades")
                    .update({ status: "Aprovada" })
                    .eq("id", disponibilidade.id)
                    .eq("status", "Pendente");

                if (error) {
                    alert("Erro ao aprovar: " + error.message);
                    return;
                }

                alert("Disponibilidade aprovada!");
                carregarDisponibilidades();
            });

            const botaoRejeitar = document.createElement("button");

            botaoRejeitar.textContent = "Rejeitar disponibilidade";
            botaoRejeitar.style.background = "#DC2626";

            botaoRejeitar.addEventListener("click", async function() {

                const { error } = await supabaseClient
                    .from("disponibilidades")
                    .update({ status: "Rejeitada" })
                    .eq("id", disponibilidade.id)
                    .eq("status", "Pendente");

                if (error) {
                    alert("Erro ao rejeitar: " + error.message);
                    return;
                }

                alert("Disponibilidade rejeitada!");
                carregarDisponibilidades();
            });

            item.append(botaoAprovar, botaoRejeitar);
        }

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir disponibilidade";
        botaoExcluir.style.background = "#DC2626";

        botaoExcluir.addEventListener("click", async function() {

            const confirmar = confirm("Deseja excluir esta disponibilidade?");

            if (!confirmar) {
                return;
            }

            const { error } = await supabaseClient
                .from("disponibilidades")
                .delete()
                .eq("id", disponibilidade.id);

            if (error) {
                alert("Erro ao excluir: " + error.message);
                return;
            }

            alert("Disponibilidade excluída com sucesso!");

            carregarDisponibilidades();
        });

        item.append(nome, dia, horario, restricao, status, botaoExcluir);
        item.style.marginBottom = "20px";

        listaDisponibilidades.appendChild(item);

    });
}


// CADASTRAR DISPONIBILIDADE

formDisponibilidade.addEventListener("submit", async function(event) {

    event.preventDefault();

    const professor = document.getElementById("professorDisponibilidade").value;
    const dia = document.getElementById("diaDisponibilidade").value;
    const inicio = document.getElementById("inicioDisponibilidade").value;
    const fim = document.getElementById("fimDisponibilidade").value;
    const restricoes = document.getElementById("restricoesDisponibilidade").value;

    if (inicio >= fim) {
        alert("O horário final deve ser posterior ao horário inicial.");
        return;
    }

    const { error } = await supabaseClient
        .from("disponibilidades")
        .insert([{
            professor_id: Number(professor),
            dia_semana: dia,
            horario_inicio: inicio,
            horario_fim: fim,
            restricoes: restricoes
        }]);

    if (error) {
        alert("Erro ao cadastrar disponibilidade: " + error.message);
        return;
    }

    alert("Disponibilidade cadastrada com sucesso!");

    formDisponibilidade.reset();

    carregarDisponibilidades();

});

btnVoltarDisponibilidade.addEventListener("click", function() {
    telaDisponibilidade.hidden = true;
    painel.hidden = false;
});

// NAVEGAÇÃO DA TELA DE VÍNCULOS

btnVinculos.addEventListener("click", function() {
    painel.hidden = true;
    telaVinculos.hidden = false;
    carregarOpcoesVinculo();
    carregarVinculos();
});

btnVoltarVinculos.addEventListener("click", function() {
    telaVinculos.hidden = true;
    painel.hidden = false;
});

// ==================================
// LOGIN
// ==================================

formLogin.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: senha
    });

    if (error) {
        alert("Erro ao entrar: " + error.message);
        return;
    }

    await carregarPerfil(data.user);
});

// ==================================
// CADASTRAR PROFESSOR
// ==================================

const formProfessor = document.getElementById("formProfessor");
const listaProfessores = document.getElementById("listaProfessores");

formProfessor.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeProfessor").value;
    const email = document.getElementById("emailProfessor").value;
    const formacao = document.getElementById("formacaoProfessor").value;
    const carga = document.getElementById("cargaProfessor").value;

    const { error } = await supabaseClient
        .from("professores")
        .insert([{
            nome: nome,
            email: email,
            formacao: formacao,
            carga_horaria_maxima: carga
        }]);

    if (error) {
        alert("Erro ao cadastrar professor: " + error.message);
        return;
    }

    alert("Professor cadastrado com sucesso!");

    formProfessor.reset();

    carregarProfessores();
});

// ==================================
// LISTAR PROFESSORES
// ==================================

async function carregarProfessores() {

    listaProfessores.textContent = "Carregando professores...";

    const { data, error } = await supabaseClient
        .from("professores")
        .select("*")
        .order("nome");

    if (error) {
        listaProfessores.textContent = "Erro ao carregar professores.";
        alert("Erro: " + error.message);
        return;
    }

    listaProfessores.replaceChildren();

    if (data.length === 0) {
        listaProfessores.textContent = "Nenhum professor cadastrado.";
        return;
    }

    data.forEach(function(professor) {

        const item = document.createElement("div");
        const nome = document.createElement("p");
        const email = document.createElement("p");
        const formacao = document.createElement("p");
        const carga = document.createElement("p");

        nome.textContent = "Nome: " + professor.nome;
        email.textContent = "E-mail: " + professor.email;
        formacao.textContent = "Formação: " + professor.formacao;
        carga.textContent = "Carga horária: " + professor.carga_horaria_maxima + " horas";

       const botaoExcluir = document.createElement("button");

botaoExcluir.textContent = "Excluir professor";
botaoExcluir.style.background = "#DC2626";

botaoExcluir.addEventListener("click", async function() {
    
    const confirmar = confirm(
        "Tem certeza de que deseja excluir " + professor.nome + "?"
    );
    
    if (!confirmar) {
        return;
    }
    
    const { error } = await supabaseClient
        .from("professores")
        .delete()
        .eq("id", professor.id);
    
    if (error) {
        alert("Erro ao excluir professor: " + error.message);
        return;
    }
    
    alert("Professor excluído com sucesso!");
    
    carregarProfessores();
});

item.append(nome, email, formacao, carga, botaoExcluir);

listaProfessores.appendChild(item);
    });
}

// ==================================
// CADASTRAR CURSO
// ==================================

formCurso.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeCurso").value;
    const coordenador = document.getElementById("coordenadorCurso").value;

    const { error } = await supabaseClient
        .from("cursos")
        .insert([{
            nome: nome,
            coordenador: coordenador
        }]);

    if (error) {
        alert("Erro ao cadastrar curso: " + error.message);
        return;
    }

    alert("Curso cadastrado com sucesso!");

    formCurso.reset();

    carregarCursos();
});


// ==================================
// CARREGAR CURSOS NO FORMULÁRIO
// ==================================

async function carregarCursosFormulario() {

    const { data, error } = await supabaseClient
        .from("cursos")
        .select("id, nome")
        .order("nome");

    if (error) {
        alert("Erro ao carregar cursos: " + error.message);
        return;
    }

    cursoDisciplina.innerHTML = '<option value="">Selecione um curso</option>';

    data.forEach(function(curso) {
        const opcao = document.createElement("option");
        opcao.value = curso.id;
        opcao.textContent = curso.nome;
        cursoDisciplina.appendChild(opcao);
    });
}

// ==================================
// LISTAR CURSOS
// ==================================

async function carregarCursos() {

    listaCursos.textContent = "Carregando cursos...";

    const { data, error } = await supabaseClient
        .from("cursos")
        .select("*")
        .order("nome");

    if (error) {
        listaCursos.textContent = "Erro ao carregar cursos.";
        alert("Erro: " + error.message);
        return;
    }

    listaCursos.replaceChildren();

    if (data.length === 0) {
        listaCursos.textContent = "Nenhum curso cadastrado.";
        return;
    }

    data.forEach(function(curso) {

        const item = document.createElement("div");
        const nome = document.createElement("p");
        const coordenador = document.createElement("p");

        nome.textContent = "Curso: " + curso.nome;
        coordenador.textContent = "Coordenador: " + curso.coordenador;

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir curso";
        botaoExcluir.style.background = "#DC2626";

        botaoExcluir.addEventListener("click", async function() {

            const confirmar = confirm(
                "Tem certeza de que deseja excluir o curso " + curso.nome + "?"
            );

            if (!confirmar) return;

            const { error } = await supabaseClient
                .from("cursos")
                .delete()
                .eq("id", curso.id);

            if (error) {
                alert("Erro ao excluir curso: " + error.message);
                return;
            }

            alert("Curso excluído com sucesso!");
            carregarCursos();
        });

        item.append(nome, coordenador, botaoExcluir);
        item.style.marginBottom = "20px";

        listaCursos.appendChild(item);
    });
}


// ==================================
// LISTAR DISCIPLINAS
// ==================================

async function carregarDisciplinas() {

    listaDisciplinas.textContent = "Carregando disciplinas...";

    const { data, error } = await supabaseClient
        .from("disciplinas")
        .select("*, cursos(nome)")
        .order("nome");

    if (error) {
        listaDisciplinas.textContent = "Erro ao carregar disciplinas.";
        alert("Erro: " + error.message);
        return;
    }

    listaDisciplinas.replaceChildren();

    if (data.length === 0) {
        listaDisciplinas.textContent = "Nenhuma disciplina cadastrada.";
        return;
    }

    data.forEach(function(disciplina) {

        const item = document.createElement("div");
        const nome = document.createElement("p");
        const carga = document.createElement("p");
        const periodo = document.createElement("p");
        const curso = document.createElement("p");

        nome.textContent = "Disciplina: " + disciplina.nome;
        carga.textContent = "Carga horária: " + disciplina.carga_horaria + " horas";
        periodo.textContent = "Período: " + disciplina.periodo;
        curso.textContent = "Curso: " + (disciplina.cursos?.nome || "Não informado");

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir disciplina";
        botaoExcluir.style.background = "#DC2626";

        botaoExcluir.addEventListener("click", async function() {

            const confirmar = confirm(
                "Tem certeza de que deseja excluir a disciplina " + disciplina.nome + "?"
            );

            if (!confirmar) return;

            const { error } = await supabaseClient
                .from("disciplinas")
                .delete()
                .eq("id", disciplina.id);

           if (error) {
    
    if (error.message.includes("alocacoes_disciplina_id_fkey")) {
        alert("Não é possível excluir esta disciplina porque existem aulas cadastradas para ela. Exclua primeiro as aulas vinculadas.");
        return;
    }
    
    alert("Erro ao excluir disciplina: " + error.message);
    return;
}

            alert("Disciplina excluída com sucesso!");
            carregarDisciplinas();
        });

        item.append(nome, carga, periodo, curso, botaoExcluir);
        item.style.marginBottom = "20px";

        listaDisciplinas.appendChild(item);
    });
}


 // ==================================
// CADASTRAR SALA
// ==================================

formSala.addEventListener("submit", async function(event) {
    event.preventDefault();

    const identificacao = document.getElementById("nomeSala").value;
    const capacidade = document.getElementById("capacidadeSala").value;

    const { error } = await supabaseClient
        .from("salas")
        .insert([{
            identificacao: identificacao,
            capacidade: Number(capacidade)
        }]);

    if (error) {
        alert("Erro ao cadastrar sala: " + error.message);
        return;
    }

    alert("Sala cadastrada com sucesso!");

    formSala.reset();

    carregarSalas();
});


// ==================================
// LISTAR SALAS
// ==================================

async function carregarSalas() {

    listaSalas.textContent = "Carregando salas...";

    const { data, error } = await supabaseClient
        .from("salas")
        .select("*")
        .order("identificacao");

    if (error) {
        listaSalas.textContent = "Erro ao carregar salas.";
        alert("Erro: " + error.message);
        return;
    }

    listaSalas.replaceChildren();

    if (data.length === 0) {
        listaSalas.textContent = "Nenhuma sala cadastrada.";
        return;
    }

    data.forEach(function(sala) {

        const item = document.createElement("div");
        const nome = document.createElement("p");
        const capacidade = document.createElement("p");

        nome.textContent = "Sala: " + sala.identificacao;
        capacidade.textContent = "Capacidade: " + sala.capacidade + " alunos";

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir sala";
        botaoExcluir.style.background = "#DC2626";

        botaoExcluir.addEventListener("click", async function() {

            const confirmar = confirm(
                "Deseja excluir a sala " + sala.identificacao + "?"
            );

            if (!confirmar) return;

            const { error } = await supabaseClient
                .from("salas")
                .delete()
                .eq("id", sala.id);

            if (error) {
                alert("Erro ao excluir sala: " + error.message);
                return;
            }

            alert("Sala excluída com sucesso!");
            carregarSalas();
        });

        item.append(nome, capacidade, botaoExcluir);
        item.style.marginBottom = "20px";

        listaSalas.appendChild(item);
    });
}




// ==================================
// CADASTRAR DISCIPLINA
// ==================================

formDisciplina.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeDisciplina").value;
    const carga = document.getElementById("cargaDisciplina").value;
    const periodo = document.getElementById("periodoDisciplina").value;
    const curso = cursoDisciplina.value;

    const { error } = await supabaseClient
        .from("disciplinas")
        .insert([{
            nome: nome,
            carga_horaria: Number(carga),
            periodo: periodo,
            curso_id: curso
        }]);

    if (error) {
        alert("Erro ao cadastrar disciplina: " + error.message);
        return;
    }

    alert("Disciplina cadastrada com sucesso!");

    formDisciplina.reset();

    carregarDisciplinas();
});



// ==================================
// CARREGAR PERFIL DO USUÁRIO
// ==================================

async function carregarPerfil(user) {
    const { data, error } = await supabaseClient
        .from("perfis")
        .select("nome, tipo")
        .eq("id", user.id)
        .single();

    if (error) {
        alert("Não foi possível carregar seu perfil.");
        await supabaseClient.auth.signOut();
        return;
    }

    telaLogin.hidden = true;
    painel.hidden = false;

    usuarioLogado.textContent =
        "Olá, " + data.nome + " (" + data.tipo + ")";
}

// ==================================
// SAIR DO SISTEMA
// ==================================

btnSair.addEventListener("click", async function() {
    await supabaseClient.auth.signOut();

    painel.hidden = true;
    telaLogin.hidden = false;

    formLogin.reset();
});

// ==================================
// VERIFICAR SESSÃO EXISTENTE
// ==================================

async function verificarSessao() {
    const { data } = await supabaseClient.auth.getSession();

    if (data.session) {
        await carregarPerfil(data.session.user);
    }
}

verificarSessao();

// CARREGAR PROFESSORES NO CAMPO DE DISPONIBILIDADE

async function carregarProfessoresDisponibilidade() {

    const campoProfessor = document.getElementById("professorDisponibilidade");

    campoProfessor.innerHTML = '<option value="">Selecione um professor</option>';

    const { data, error } = await supabaseClient
        .from("professores")
        .select("id, nome")
        .order("nome");

    if (error) {
        alert("Erro ao carregar professores: " + error.message);
        return;
    }

    data.forEach(function(professor) {

        const opcao = document.createElement("option");

        opcao.value = professor.id;
        opcao.textContent = professor.nome;

        campoProfessor.appendChild(opcao);

    });
}

// CARREGAR PROFESSORES E DISCIPLINAS PARA VÍNCULOS

async function carregarOpcoesVinculo() {

    const campoProfessor = document.getElementById("professorVinculo");
    const campoDisciplina = document.getElementById("disciplinaVinculo");

    const { data: professores, error: erroProfessores } = await supabaseClient
        .from("professores")
        .select("id, nome")
        .order("nome");

    if (erroProfessores) {
        alert("Erro ao carregar professores: " + erroProfessores.message);
        return;
    }

    const { data: disciplinas, error: erroDisciplinas } = await supabaseClient
        .from("disciplinas")
        .select("id, nome")
        .order("nome");

    if (erroDisciplinas) {
        alert("Erro ao carregar disciplinas: " + erroDisciplinas.message);
        return;
    }

    campoProfessor.innerHTML = '<option value="">Selecione um professor</option>';
    campoDisciplina.innerHTML = '<option value="">Selecione uma disciplina</option>';

    professores.forEach(function(professor) {
        const opcao = document.createElement("option");
        opcao.value = professor.id;
        opcao.textContent = professor.nome;
        campoProfessor.appendChild(opcao);
    });

    disciplinas.forEach(function(disciplina) {
        const opcao = document.createElement("option");
        opcao.value = disciplina.id;
        opcao.textContent = disciplina.nome;
        campoDisciplina.appendChild(opcao);
        
    });
        
    }
    
    
// CARREGAR CURSOS NO FORMULÁRIO DE TURMAS
async function carregarCursosTurma() {

    const campoCurso = document.getElementById("cursoTurma");

    const { data, error } = await supabaseClient
        .from("cursos")
        .select("id, nome")
        .order("nome");

    if (error) {
        alert("Erro ao carregar cursos: " + error.message);
        return;
    }

    campoCurso.innerHTML = '<option value="">Selecione um curso</option>';

    data.forEach(function(curso) {

        const opcao = document.createElement("option");

        opcao.value = curso.id;
        opcao.textContent = curso.nome;

        campoCurso.appendChild(opcao);

    });

}

// CARREGAR TURMAS CADASTRADAS
async function carregarTurmas() {

    listaTurmas.textContent = "Carregando turmas...";

    const { data, error } = await supabaseClient
        .from("turmas")
        .select("*")
        .order("id");

    if (error) {
        listaTurmas.textContent = "Erro ao carregar turmas.";
        alert("Erro: " + error.message);
        return;
    }

    listaTurmas.replaceChildren();

    if (data.length === 0) {
        listaTurmas.textContent = "Nenhuma turma cadastrada.";
        return;
    }

    const { data: cursos, error: erroCursos } = await supabaseClient
        .from("cursos")
        .select("id, nome");

    if (erroCursos) {
        alert("Erro ao carregar cursos: " + erroCursos.message);
        return;
    }

    data.forEach(function(turma) {

        const curso = cursos.find(function(item) {
            return item.id === turma.curso_id;
        });

        const item = document.createElement("div");

        const informacao = document.createElement("p");

        informacao.textContent =
            turma.identificacao +
            " - " +
            (curso ? curso.nome : "Curso não encontrado") +
            " - " +
            (turma.periodo || "Período não informado");

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir turma";
        botaoExcluir.style.background = "#DC2626";

        botaoExcluir.addEventListener("click", async function() {

            const confirmar = confirm("Deseja excluir esta turma?");

            if (!confirmar) {
                return;
            }

            const { error } = await supabaseClient
                .from("turmas")
                .delete()
                .eq("id", turma.id);

            if (error) {
                alert("Erro ao excluir turma: " + error.message);
                return;
            }

            alert("Turma excluída com sucesso!");

            carregarTurmas();

        });

        item.append(informacao, botaoExcluir);
        item.style.marginBottom = "20px";

        listaTurmas.appendChild(item);

    });

    
}



async function carregarVinculos() {

    listaVinculos.textContent = "Carregando vínculos...";

    const { data, error } = await supabaseClient
        .from("professor_disciplinas")
        .select("*");

    if (error) {
        listaVinculos.textContent = "Erro ao carregar vínculos.";
        alert("Erro: " + error.message);
        return;
    }

    listaVinculos.replaceChildren();

    if (data.length === 0) {
        listaVinculos.textContent = "Nenhum vínculo cadastrado.";
        return;
    }

    const { data: professores, error: erroProfessores } = await supabaseClient
        .from("professores")
        .select("id, nome");

    if (erroProfessores) {
        alert("Erro ao carregar professores: " + erroProfessores.message);
        return;
    }

    const { data: disciplinas, error: erroDisciplinas } = await supabaseClient
        .from("disciplinas")
        .select("id, nome");

    if (erroDisciplinas) {
        alert("Erro ao carregar disciplinas: " + erroDisciplinas.message);
        return;
    }

    data.forEach(function(vinculo) {

        const professor = professores.find(item => item.id === vinculo.professor_id);
        const disciplina = disciplinas.find(item => item.id === vinculo.disciplina_id);

        const item = document.createElement("div");
        const informacao = document.createElement("p");

        informacao.textContent =
            "Professor: " + (professor ? professor.nome : "Não encontrado") +
            " | Disciplina: " + (disciplina ? disciplina.nome : "Não encontrada") +
            " | Professor principal: " + (vinculo.professor_principal ? "Sim" : "Não");

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir vínculo";
        botaoExcluir.style.background = "#DC2626";

        botaoExcluir.addEventListener("click", async function() {

            const confirmar = confirm("Deseja excluir este vínculo?");

            if (!confirmar) {
                return;
            }

            const { error } = await supabaseClient
                .from("professor_disciplinas")
                .delete()
                .eq("id", vinculo.id);

            if (error) {
                alert("Erro ao excluir vínculo: " + error.message);
                return;
            }

            alert("Vínculo excluído com sucesso!");

            carregarVinculos();
        });

        item.append(informacao, botaoExcluir);
        item.style.marginBottom = "20px";

        listaVinculos.appendChild(item);
    });
}



// CADASTRAR VÍNCULO PROFESSOR E DISCIPLINA
formVinculo.addEventListener("submit", async function(event) {
    event.preventDefault();

    const professor = document.getElementById("professorVinculo").value;
    const disciplina = document.getElementById("disciplinaVinculo").value;
    const principal = document.getElementById("professorPrincipal").value;

    const { error } = await supabaseClient
        .from("professor_disciplinas")
        .insert([{
            professor_id: Number(professor),
            disciplina_id: Number(disciplina),
            professor_principal: principal === "true"
        }]);

    if (error) {
        alert("Erro ao cadastrar vínculo: " + error.message);
        return;
    }

    alert("Vínculo cadastrado com sucesso!");
    formVinculo.reset();
    carregarVinculos();
});

// CADASTRAR TURMA
formTurma.addEventListener("submit", async function(event) {
    event.preventDefault();

    const identificacao = document.getElementById("identificacaoTurma").value;
    const curso = document.getElementById("cursoTurma").value;
    const periodo = document.getElementById("periodoTurma").value;

    const { error } = await supabaseClient
        .from("turmas")
        .insert([{
            identificacao: identificacao,
            curso_id: Number(curso),
            periodo: periodo
        }]);

    if (error) {
        alert("Erro ao cadastrar turma: " + error.message);
        return;
    }

    alert("Turma cadastrada com sucesso!");
    formTurma.reset();
    carregarTurmas();
});

// CARREGAR OPÇÕES DA GRADE SEMANAL
async function carregarOpcoesGrade() {

    const consultas = [
        { tabela: "professores", campo: "professorGrade", coluna: "nome", titulo: "Selecione um professor" },
        { tabela: "disciplinas", campo: "disciplinaGrade", coluna: "nome", titulo: "Selecione uma disciplina" },
        { tabela: "turmas", campo: "turmaGrade", coluna: "identificacao", titulo: "Selecione uma turma" },
        { tabela: "salas", campo: "salaGrade", coluna: "identificacao", titulo: "Selecione uma sala" }
    ];

    for (const consulta of consultas) {
        const campo = document.getElementById(consulta.campo);

        const { data, error } = await supabaseClient
            .from(consulta.tabela)
            .select("id, " + consulta.coluna)
            .order(consulta.coluna);

        if (error) {
            alert("Erro ao carregar " + consulta.tabela + ": " + error.message);
            return;
        }

        campo.innerHTML = '<option value="">' + consulta.titulo + '</option>';

        data.forEach(function(item) {
            const opcao = document.createElement("option");
            opcao.value = item.id;
            opcao.textContent = item[consulta.coluna];
            campo.appendChild(opcao);
        });
    }
}

// CARREGAR AULAS CADASTRADAS NA GRADE
async function carregarGrade() {
    
    listaGrade.textContent = "Carregando aulas...";
    
    const { data, error } = await supabaseClient
        .from("alocacoes")
        .select("*")
        .order("dia_semana")
        .order("horario_inicio");
    
    if (error) {
        listaGrade.textContent = "Erro ao carregar aulas.";
        alert("Erro ao carregar grade: " + error.message);
        return;
    }
    
    listaGrade.replaceChildren();
    
    if (data.length === 0) {
        listaGrade.textContent = "Nenhuma aula cadastrada.";
        return;
    }
    
    const tabelas = ["professores", "disciplinas", "turmas", "salas"];
    const resultados = {};
    
    for (const tabela of tabelas) {
        const { data: itens, error: erroTabela } = await supabaseClient
            .from(tabela)
            .select("*");
        
        if (erroTabela) {
            alert("Erro ao carregar " + tabela + ": " + erroTabela.message);
            return;
        }
        
        resultados[tabela] = itens;
    }
    
    data.forEach(function(aula) {
        
        const professor = resultados.professores.find(
            item => item.id === aula.professor_id
        );
        
        const disciplina = resultados.disciplinas.find(
            item => item.id === aula.disciplina_id
        );
        
        const turma = resultados.turmas.find(
            item => item.id === aula.turma_id
        );
        
        const sala = resultados.salas.find(
            item => item.id === aula.sala_id
        );
        
        const item = document.createElement("div");
        const informacao = document.createElement("p");
        
        informacao.textContent =
            (disciplina ? disciplina.nome : "Disciplina não encontrada") +
            " | " +
            (professor ? professor.nome : "Professor não encontrado") +
            " | " +
            (turma ? turma.identificacao : "Turma não encontrada") +
            " | " +
            (sala ? sala.identificacao : "Sala não encontrada") +
            " | " +
            aula.dia_semana +
            " | " +
            aula.horario_inicio +
            " às " +
            aula.horario_fim;
        
        const botaoExcluir = document.createElement("button");
        
        botaoExcluir.textContent = "Excluir aula";
        botaoExcluir.style.background = "#DC2626";
        
        botaoExcluir.addEventListener("click", async function() {
            
            const confirmar = confirm(
                "Tem certeza que deseja excluir esta aula?"
            );
            
            if (!confirmar) {
                return;
            }
            
            const { error } = await supabaseClient
                .from("alocacoes")
                .delete()
                .eq("id", aula.id);
            
            if (error) {
                alert("Erro ao excluir aula: " + error.message);
                return;
            }
            
            alert("Aula excluída com sucesso!");
            
            carregarGrade();
        });
        
        item.append(informacao, botaoExcluir);
        item.style.marginBottom = "20px";
        
        listaGrade.appendChild(item);
    });
}
// BUSCAR DISPONIBILIDADES APROVADAS
async function buscarDisponibilidadesAprovadas() {

    const { data, error } = await supabaseClient
        .from("disponibilidades")
        .select("*")
        .eq("status", "Aprovada");

    if (error) {
        alert("Erro ao buscar disponibilidades: " + error.message);
        return null;
    }

    return data;
}

// VERIFICAR SOBREPOSIÇÃO DE HORÁRIOS
function horariosSobrepostos(inicio1, fim1, inicio2, fim2) {

    return inicio1 < fim2 && fim1 > inicio2;

}

// GERAR SUGESTÕES AUTOMÁTICAS
async function gerarSugestoesAutomaticas() {
    
    listaSugestoes.textContent = "Analisando disponibilidades e horários...";
    
    const disponibilidades = await buscarDisponibilidadesAprovadas();
    console.log("Disponibilidades recebidas:", disponibilidades);
    
    if (disponibilidades === null) {
        listaSugestoes.textContent = "";
        return;
    }
    
    if (disponibilidades.length === 0) {
        listaSugestoes.textContent = "Não existem disponibilidades aprovadas para gerar sugestões.";
        return;
    }
    
    const { data: professores, error: erroProfessores } = await supabaseClient
        .from("professores")
        .select("*");
    
    if (erroProfessores) {
        alert("Erro ao buscar professores: " + erroProfessores.message);
        return;
    }
    
    const { data: vinculos, error: erroVinculos } = await supabaseClient
        .from("professor_disciplinas")
        .select("*");
    
    if (erroVinculos) {
        alert("Erro ao buscar vínculos: " + erroVinculos.message);
        return;
    }
    
    const { data: disciplinas, error: erroDisciplinas } = await supabaseClient
    .from("disciplinas")
    .select("*");

if (erroDisciplinas) {
    alert("Erro ao buscar disciplinas: " + erroDisciplinas.message);
    return;
}

const { data: turmas, error: erroTurmas } = await supabaseClient
    .from("turmas")
    .select("*");

if (erroTurmas) {
    alert("Erro ao buscar turmas: " + erroTurmas.message);
    return;
}

const { data: salas, error: erroSalas } = await supabaseClient
    .from("salas")
    .select("*");

if (erroSalas) {
    alert("Erro ao buscar salas: " + erroSalas.message);
    return;
}

const { data: alocacoes, error: erroAlocacoes } = await supabaseClient
    .from("alocacoes")
    .select("*");

if (erroAlocacoes) {
    alert("Erro ao buscar aulas existentes: " + erroAlocacoes.message);
    return;
}

console.log("TURMAS:", turmas);
console.log("SALAS:", salas);
console.log("AULAS EXISTENTES:", alocacoes);
console.log("DISCIPLINAS:", disciplinas);

let quantidadeSugestoes = 0;

function professorTemConflito(professorId, dia, inicio, fim) {
    return alocacoes.some(function(aula) {
        return Number(aula.professor_id) === Number(professorId) &&
            aula.dia_semana === dia &&
            horariosSobrepostos(
                inicio,
                fim,
                aula.horario_inicio,
                aula.horario_fim
            );
    });
}


listaSugestoes.innerHTML = "";

let sugestaoSelecionada = null;

disponibilidades.forEach(function(disponibilidade) {
    
    const professor = professores.find(function(item) {
        return Number(item.id) === Number(disponibilidade.professor_id);
    });
    
    if (!professor) {
        return;
    }
    
    const vinculosProfessor = vinculos.filter(function(vinculo) {
        return Number(vinculo.professor_id) === Number(professor.id);
    });
    
    vinculosProfessor.forEach(function(vinculo) {
        
        const disciplina = disciplinas.find(function(item) {
            return Number(item.id) === Number(vinculo.disciplina_id);
        });
        
        if (!disciplina) {
            return;
        }
        
        if (professorTemConflito(
        professor.id,
        disponibilidade.dia_semana,
        disponibilidade.horario_inicio,
        disponibilidade.horario_fim
    )) {
    listaSugestoes.textContent = "O professor já possui uma aula nesse horário.";
    return;
}

const turma = turmas.find(function(item) {
    return Number(item.curso_id) === Number(disciplina.curso_id) &&
        String(item.periodo) === String(disciplina.periodo);
});

if (!turma) {
    listaSugestoes.textContent = "Não foi encontrada uma turma com o mesmo curso e período da disciplina.";
    return;
}

const turmaOcupada = alocacoes.some(function(aula) {

    return Number(aula.turma_id) === Number(turma.id) &&
        aula.dia_semana === disponibilidade.dia_semana &&
        horariosSobrepostos(
            disponibilidade.horario_inicio,
            disponibilidade.horario_fim,
            aula.horario_inicio,
            aula.horario_fim
        );

});

if (turmaOcupada) {
    listaSugestoes.textContent = "A turma já possui aula nesse horário.";
    return;
}


const salaDisponivel = salas.find(function(sala) {

    return !alocacoes.some(function(aula) {

        return Number(aula.sala_id) === Number(sala.id) &&
            aula.dia_semana === disponibilidade.dia_semana &&
            horariosSobrepostos(
                disponibilidade.horario_inicio,
                disponibilidade.horario_fim,
                aula.horario_inicio,
                aula.horario_fim
            );

    });

});

if (!salaDisponivel) {
    listaSugestoes.textContent = "Não existe sala disponível nesse horário.";
    return;
}


        const bloco = document.createElement("div");
        
        bloco.innerHTML =
            "<h3>Possível sugestão</h3>" +
            "<p>Professor: " + professor.nome + "</p>" +
            "<p>Disciplina: " + disciplina.nome + "</p>" +
            "<p>Dia: " + disponibilidade.dia_semana + "</p>" +
            "<p>Turma: " + turma.identificacao + "</p>" +
"<p>Sala: " + salaDisponivel.identificacao + "</p>" +
            "<p>Horário disponível: " +
            disponibilidade.horario_inicio + " às " +
            disponibilidade.horario_fim + "</p>";
        
        bloco.style.marginBottom = "15px";

const botaoEscolher = document.createElement("button");

botaoEscolher.type = "button";
botaoEscolher.textContent = "Escolher esta sugestão";

botaoEscolher.addEventListener("click", function() {
    
    if (sugestaoSelecionada) {
        sugestaoSelecionada.bloco.style.border = "";
        sugestaoSelecionada.bloco.style.padding = "";
        sugestaoSelecionada.botao.textContent = "Escolher esta sugestão";
    }
    
    sugestaoSelecionada = {
        bloco: bloco,
        botao: botaoEscolher
    };
    
    bloco.style.border = "2px solid #F28C28";
    bloco.style.padding = "12px";
    
    botaoEscolher.textContent = "Sugestão escolhida";
});

bloco.appendChild(botaoEscolher);

listaSugestoes.appendChild(bloco);
        
        quantidadeSugestoes++;
    });
    
});

console.log("Quantidade:", quantidadeSugestoes);
console.log("Disponibilidades:", disponibilidades);
console.log("Professores:", professores);
console.log("Vínculos:", vinculos);
console.log("Disciplinas:", disciplinas);
console.log("Turmas:", turmas);
console.log("Salas:", salas);
console.log("Alocações:", alocacoes);

if (quantidadeSugestoes === 0) {
    listaSugestoes.textContent =
        "Nenhuma sugestão foi gerada. Verifique os dados cadastrados.";
    
    console.log("DIAGNÓSTICO DA GERAÇÃO:");
    console.log("Quantidade de sugestões:", quantidadeSugestoes);
    console.log("Disponibilidades:", disponibilidades);
    console.log("Professores:", professores);
    console.log("Vínculos:", vinculos);
    console.log("Disciplinas:", disciplinas);
    console.log("Turmas:", turmas);
    console.log("Salas:", salas);
}
    
}

// BOTÃO PARA GERAR SUGESTÕES
btnGerarSugestoes.addEventListener("click", function() {
    gerarSugestoesAutomaticas();
});

// CADASTRAR AULA NA GRADE SEMANAL
formGrade.addEventListener("submit", async function(event) {
    event.preventDefault();

    const professor = Number(document.getElementById("professorGrade").value);
    const disciplina = Number(document.getElementById("disciplinaGrade").value);
    const turma = Number(document.getElementById("turmaGrade").value);
    const sala = Number(document.getElementById("salaGrade").value);
    const dia = document.getElementById("diaGrade").value;
    const inicio = document.getElementById("inicioGrade").value;
    const fim = document.getElementById("fimGrade").value;

    if (inicio >= fim) {
        alert("O horário de término deve ser posterior ao início.");
        return;
    }

    const { data: aulas, error: erroConsulta } = await supabaseClient
        .from("alocacoes")
        .select("*")
        .eq("dia_semana", dia);

    if (erroConsulta) {
        alert("Erro ao verificar horários: " + erroConsulta.message);
        return;
    }

    const conflito = aulas.find(function(aula) {
        const horariosSobrepostos =
            inicio < aula.horario_fim &&
            fim > aula.horario_inicio;

        return horariosSobrepostos && (
            aula.professor_id === professor ||
            aula.sala_id === sala ||
            aula.turma_id === turma
        );
    });

    if (conflito) {
        alert("Conflito de horário! O professor, a sala ou a turma já possui uma aula nesse período.");
        return;
    }

    const { error } = await supabaseClient
        .from("alocacoes")
        .insert([{
            professor_id: professor,
            disciplina_id: disciplina,
            turma_id: turma,
            sala_id: sala,
            dia_semana: dia,
            horario_inicio: inicio,
            horario_fim: fim
        }]);

    if (error) {
        alert("Erro ao cadastrar aula: " + error.message);
        return;
    }

    alert("Aula cadastrada com sucesso!");
    formGrade.reset();
    carregarGrade();
});

// GERAR RELATÓRIOS
btnGerarRelatorio.addEventListener("click", async function() {

    const tipo = tipoRelatorio.value;

    if (!tipo) {
        alert("Selecione um tipo de relatório.");
        return;
    }

    resultadoRelatorio.textContent = "Carregando relatório...";

    const { data: aulas, error } = await supabaseClient
        .from("alocacoes")
        .select("*");

    if (error) {
        alert("Erro ao carregar aulas: " + error.message);
        resultadoRelatorio.textContent = "";
        return;
    }

    if (aulas.length === 0) {
        resultadoRelatorio.textContent = "Nenhuma aula cadastrada.";
        return;
    }

    const tabelas = {
        professores: "professores",
        turmas: "turmas",
        salas: "salas",
        disciplinas: "disciplinas"
    };

    const dados = {};

    for (const chave in tabelas) {
        const { data, error } = await supabaseClient
            .from(tabelas[chave])
            .select("*");

        if (error) {
            alert("Erro ao carregar " + chave + ": " + error.message);
            resultadoRelatorio.textContent = "";
            return;
        }

        dados[chave] = data;
    }

    let grupos = {};

    aulas.forEach(function(aula) {

        let nome = "";

        if (tipo === "professores") {
            const item = dados.professores.find(
                p => p.id === aula.professor_id
            );
            nome = item ? item.nome : "Professor não encontrado";
        }

        if (tipo === "turmas") {
            const item = dados.turmas.find(
                t => t.id === aula.turma_id
            );
            nome = item ? item.identificacao : "Turma não encontrada";
        }

        if (tipo === "salas") {
            const item = dados.salas.find(
                s => s.id === aula.sala_id
            );
            nome = item ? item.identificacao : "Sala não encontrada";
        }

        if (!grupos[nome]) {
            grupos[nome] = [];
        }

        grupos[nome].push(aula);
    });

    resultadoRelatorio.replaceChildren();

    const titulo = document.createElement("h3");
    titulo.textContent = "Relatório gerado";
    resultadoRelatorio.appendChild(titulo);

    for (const nome in grupos) {

        const bloco = document.createElement("div");
        const cabecalho = document.createElement("h3");

        cabecalho.textContent =
            nome + " - " + grupos[nome].length + " aula(s)";

        bloco.appendChild(cabecalho);

        grupos[nome].forEach(function(aula) {

            const disciplina = dados.disciplinas.find(
                d => d.id === aula.disciplina_id
            );

            const informacao = document.createElement("p");

            informacao.textContent =
                (disciplina ? disciplina.nome : "Disciplina não encontrada") +
                " | " +
                aula.dia_semana +
                " | " +
                aula.horario_inicio +
                " às " +
                aula.horario_fim;

            bloco.appendChild(informacao);
        });

        bloco.style.marginBottom = "20px";
        resultadoRelatorio.appendChild(bloco);
    }

});

// EXPORTAR RELATÓRIO
btnExportarRelatorio.addEventListener("click", function() {

    const conteudo = resultadoRelatorio.innerText.trim();

    if (!conteudo) {
        alert("Gere um relatório antes de exportar.");
        return;
    }

    const arquivo = new Blob(
        [conteudo],
        { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(arquivo);

    const link = document.createElement("a");

    link.href = url;
    link.download = "relatorio.txt";

    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(url);

});