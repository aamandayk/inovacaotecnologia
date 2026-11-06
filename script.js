// ========== NAVEGAÇÃO ==========
function navegar(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === sectionId);
  });

  document.getElementById('mainNav').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Menu mobile
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});

// Botões de navegação
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => navegar(btn.dataset.section));
});

// ========== FILTROS LINHA DO TEMPO ==========
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.timeline-item').forEach(item => {
      if (filter === 'todos' || item.dataset.cat === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ========== MODAL ==========
function abrirModal() {
  document.getElementById('modal').classList.add('active');
}

function fecharModal() {
  document.getElementById('modal').classList.remove('active');
}

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') fecharModal();
});

// ========== MAPA ==========
function mostrarPonto(el, titulo, descricao) {
  document.querySelectorAll('.map-point').forEach(p => p.classList.remove('active'));
  el.classList.add('active');

  document.getElementById('popupTitle').textContent = titulo;
  document.getElementById('popupDesc').textContent = descricao;
  document.getElementById('mapPopup').classList.add('active');
}

function fecharPopup() {
  document.getElementById('mapPopup').classList.remove('active');
  document.querySelectorAll('.map-point').forEach(p => p.classList.remove('active'));
}

// ========== QUIZ GAMIFICADO ==========
const perguntas = [
  {
    pergunta: "Quem foi a líder guerreira do Quilombo dos Palmares, companheira de Zumbi?",
    opcoes: ["Dandara dos Palmares", "Tereza de Benguela", "Aqualtune", "Luísa Mahin"],
    correta: 0,
    explicacao: "Dandara dos Palmares foi uma das principais líderes militares do quilombo e símbolo de resistência negra."
  },
  {
    pergunta: "Qual lei tornou obrigatório o ensino da história e cultura afro-brasileira nas escolas?",
    opcoes: ["Lei Áurea", "Lei 10.639/03", "Lei do Ventre Livre", "Constituição de 1988"],
    correta: 1,
    explicacao: "A Lei 10.639/03 (e depois a 11.645/08) tornou obrigatório o ensino da história e cultura afro-brasileira e indígena."
  },
  {
    pergunta: "O que é racismo estrutural?",
    opcoes: [
      "Apenas ofensas individuais entre pessoas",
      "Um sistema que organiza a sociedade de forma a privilegiar certos grupos e discriminar outros",
      "Uma ideologia que não existe mais no Brasil",
      "Somente discriminação no mercado de trabalho"
    ],
    correta: 1,
    explicacao: "Racismo estrutural é a forma como o racismo está enraizado nas instituições, políticas e relações sociais."
  },
  {
    pergunta: "Qual escritor brasileiro, neto de escravizados, é considerado um dos maiores da literatura nacional?",
    opcoes: ["José de Alencar", "Machado de Assis", "Lima Barreto", "Castro Alves"],
    correta: 1,
    explicacao: "Machado de Assis, negro e neto de escravizados, é um dos maiores escritores da literatura brasileira e mundial."
  },
  {
    pergunta: "Quem é Ailton Krenak?",
    opcoes: [
      "Um líder quilombola do século XIX",
      "Líder indígena, escritor e pensador contemporâneo",
      "Um músico de samba dos anos 1970",
      "Um político do período imperial"
    ],
    correta: 1,
    explicacao: "Ailton Krenak é um importante líder indígena, ambientalista e autor de obras como 'Ideias para adiar o fim do mundo'."
  },
  {
    pergunta: "O Dia da Consciência Negra (20 de novembro) marca:",
    opcoes: [
      "A assinatura da Lei Áurea",
      "A morte de Zumbi dos Palmares",
      "A chegada dos primeiros africanos ao Brasil",
      "A criação do Movimento Negro Unificado"
    ],
    correta: 1,
    explicacao: "O 20 de novembro marca a morte de Zumbi dos Palmares em 1695 e se tornou o principal dia de afirmação da luta antirracista."
  }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respondidas = 0;

function iniciarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  respondidas = 0;
  document.getElementById('quizResult').classList.remove('show');
  document.getElementById('quizContent').style.display = 'block';
  atualizarQuiz();
}

function atualizarQuiz() {
  const q = perguntas[perguntaAtual];
  document.getElementById('quizQuestion').textContent = q.pergunta;
  document.getElementById('quizScore').textContent = `Pontuação: ${pontuacao}`;
  document.getElementById('quizProgress').textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

  const optionsContainer = document.getElementById('quizOptions');
  optionsContainer.innerHTML = '';

  q.opcoes.forEach((opcao, index) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opcao;
    btn.onclick = () => responderQuiz(index);
    optionsContainer.appendChild(btn);
  });

  document.getElementById('quizFeedback').classList.remove('show', 'correct', 'wrong');
  document.getElementById('quizNext').style.display = 'none';
}

function responderQuiz(indice) {
  const q = perguntas[perguntaAtual];
  const botoes = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quizFeedback');

  botoes.forEach(b => b.disabled = true);

  if (indice === q.correta) {
    botoes[indice].classList.add('correct');
    pontuacao += 10;
    feedback.textContent = '✓ Correto! ' + q.explicacao;
    feedback.classList.add('show', 'correct');
  } else {
    botoes[indice].classList.add('wrong');
    botoes[q.correta].classList.add('correct');
    feedback.textContent = '✗ Incorreto. ' + q.explicacao;
    feedback.classList.add('show', 'wrong');
  }

  respondidas++;
  document.getElementById('quizScore').textContent = `Pontuação: ${pontuacao}`;
  document.getElementById('quizNext').style.display = 'inline-block';
}

function proximaPergunta() {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    atualizarQuiz();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById('quizContent').style.display = 'none';
  const result = document.getElementById('quizResult');
  result.classList.add('show');

  const maxPontos = perguntas.length * 10;
  const porcentagem = Math.round((pontuacao / maxPontos) * 100);

  document.getElementById('finalScore').textContent = `${pontuacao} / ${maxPontos}`;

  let mensagem = '';
  if (porcentagem >= 80) {
    mensagem = 'Excelente! Você demonstra um ótimo conhecimento sobre relações étnico-raciais.';
  } else if (porcentagem >= 50) {
    mensagem = 'Bom trabalho! Continue estudando para aprofundar ainda mais seus conhecimentos.';
  } else {
    mensagem = 'Continue explorando a plataforma! Há muito conteúdo interessante para aprender.';
  }

  document.getElementById('resultMessage').textContent = mensagem;
}