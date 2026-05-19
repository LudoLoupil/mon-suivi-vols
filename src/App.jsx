import React, { useMemo, useState } from 'react'

/* ---------------------------------------------------------------- données */

const VOCAB = [
  {
    nom: 'Salutations & politesse',
    mots: [
      { fr: 'Bonjour', pt: 'Bom dia', pron: 'bonn djia' },
      { fr: 'Bonsoir', pt: 'Boa noite', pron: 'boa noïtchi' },
      { fr: 'Comment ça va ?', pt: 'Tudo bem?', pron: 'toudou beinn' },
      { fr: 'Merci beaucoup', pt: 'Muito obrigado', pron: 'mouïntou obrigadou' },
      { fr: 'De rien', pt: 'De nada', pron: 'dji nada' },
      { fr: 'Excusez-moi', pt: 'Com licença', pron: 'konm lissensa' },
      { fr: 'Désolé', pt: 'Desculpa', pron: 'djiskoupa' },
      { fr: 'Enchanté', pt: 'Prazer', pron: 'prazér' },
    ],
  },
  {
    nom: 'Famille',
    mots: [
      { fr: 'La famille', pt: 'A família', pron: 'a familia' },
      { fr: 'Le père', pt: 'O pai', pron: 'ou paï' },
      { fr: 'La mère', pt: 'A mãe', pron: 'a mãï' },
      { fr: 'Le frère', pt: 'O irmão', pron: 'ou irmãou' },
      { fr: 'La sœur', pt: 'A irmã', pron: 'a irmã' },
      { fr: "L'enfant", pt: 'A criança', pron: 'a kriansa' },
      { fr: 'Le mari', pt: 'O marido', pron: 'ou maridou' },
      { fr: 'La femme (épouse)', pt: 'A esposa', pron: 'a espoza' },
    ],
  },
  {
    nom: 'Travail / études',
    mots: [
      { fr: 'Le travail', pt: 'O trabalho', pron: 'ou trabaliou' },
      { fr: 'Le bureau', pt: 'O escritório', pron: 'ou eskritóriou' },
      { fr: 'La réunion', pt: 'A reunião', pron: 'a réouniãou' },
      { fr: "L'entreprise", pt: 'A empresa', pron: 'a einnpréza' },
      { fr: "L'école", pt: 'A escola', pron: 'a eskola' },
      { fr: 'Étudier', pt: 'Estudar', pron: 'estoudar' },
      { fr: 'Apprendre', pt: 'Aprender', pron: 'aprènndér' },
      { fr: 'Le projet', pt: 'O projeto', pron: 'ou projétou' },
    ],
  },
  {
    nom: 'Courses / argent',
    mots: [
      { fr: "L'argent", pt: 'O dinheiro', pron: 'ou djiniéirou' },
      { fr: 'Cher', pt: 'Caro', pron: 'karou' },
      { fr: 'Bon marché', pt: 'Barato', pron: 'baratou' },
      { fr: 'Payer', pt: 'Pagar', pron: 'pagar' },
      { fr: 'La carte (bancaire)', pt: 'O cartão', pron: 'ou kartãou' },
      { fr: 'Le marché', pt: 'O mercado', pron: 'ou mèrkadou' },
      { fr: 'Acheter', pt: 'Comprar', pron: 'konnprar' },
      { fr: 'La monnaie (rendue)', pt: 'O troco', pron: 'ou trokou' },
    ],
  },
  {
    nom: 'Santé / corps',
    mots: [
      { fr: 'La tête', pt: 'A cabeça', pron: 'a kabésa' },
      { fr: 'Le ventre', pt: 'A barriga', pron: 'a bariga' },
      { fr: 'Malade', pt: 'Doente', pron: 'doèntchi' },
      { fr: 'Le médecin', pt: 'O médico', pron: 'ou médikou' },
      { fr: 'La douleur', pt: 'A dor', pron: 'a dor' },
      { fr: 'Le médicament', pt: 'O remédio', pron: 'ou rémédiou' },
      { fr: 'Fatigué', pt: 'Cansado', pron: 'kannsadou' },
      { fr: "L'hôpital", pt: 'O hospital', pron: 'ou ospitaou' },
    ],
  },
  {
    nom: 'Émotions / caractère',
    mots: [
      { fr: 'Content', pt: 'Feliz', pron: 'félis' },
      { fr: 'Triste', pt: 'Triste', pron: 'tristchi' },
      { fr: 'En colère', pt: 'Com raiva', pron: 'konm raïva' },
      { fr: 'Avoir peur', pt: 'Ter medo', pron: 'tér médou' },
      { fr: 'Gentil', pt: 'Gentil', pron: 'jènntchiou' },
      { fr: 'Énervé', pt: 'Bravo', pron: 'bravou' },
      { fr: 'Fier', pt: 'Orgulhoso', pron: 'orgouliôzou' },
      { fr: 'Calme', pt: 'Calmo', pron: 'kaoumou' },
    ],
  },
  {
    nom: 'Ville / déplacements',
    mots: [
      { fr: 'La rue', pt: 'A rua', pron: 'a roua' },
      { fr: 'La voiture', pt: 'O carro', pron: 'ou karou' },
      { fr: 'Le bus', pt: 'O ônibus', pron: 'ou ônibous' },
      { fr: 'À gauche', pt: 'À esquerda', pron: 'a eskérda' },
      { fr: 'À droite', pt: 'À direita', pron: 'a djiréita' },
      { fr: 'Tout droit', pt: 'Em frente', pron: 'einn frènntchi' },
      { fr: 'Près', pt: 'Perto', pron: 'pèrtou' },
      { fr: 'Loin', pt: 'Longe', pron: 'lonnji' },
    ],
  },
  {
    nom: 'Temps / météo',
    mots: [
      { fr: "Aujourd'hui", pt: 'Hoje', pron: 'ôji' },
      { fr: 'Demain', pt: 'Amanhã', pron: 'amaniã' },
      { fr: 'Hier', pt: 'Ontem', pron: 'onntéinn' },
      { fr: 'Maintenant', pt: 'Agora', pron: 'agora' },
      { fr: 'Il fait chaud', pt: 'Está calor', pron: 'esta kalor' },
      { fr: 'Il pleut', pt: 'Está chovendo', pron: 'esta chovènndou' },
      { fr: 'Le matin', pt: 'A manhã', pron: 'a maniã' },
      { fr: 'Le soir', pt: 'A noite', pron: 'a noïtchi' },
    ],
  },
  {
    nom: 'Verbes courants',
    mots: [
      { fr: 'Être (état)', pt: 'Estar', pron: 'estar' },
      { fr: 'Être (essence)', pt: 'Ser', pron: 'sér' },
      { fr: 'Avoir', pt: 'Ter', pron: 'tér' },
      { fr: 'Aller', pt: 'Ir', pron: 'ir' },
      { fr: 'Faire', pt: 'Fazer', pron: 'fazér' },
      { fr: 'Vouloir', pt: 'Querer', pron: 'kérér' },
      { fr: 'Pouvoir', pt: 'Poder', pron: 'podér' },
      { fr: 'Parler', pt: 'Falar', pron: 'falar' },
    ],
  },
]

const PRONOMS = ['eu', 'você / ele / ela', 'nós', 'vocês / eles / elas']

const TEMPS = ['Présent', 'Passé (perfeito)', 'Futur']

// formes dans l'ordre de PRONOMS : [eu, você, nós, vocês]
const VERBS = [
  { inf: 'falar', fr: 'parler', f: { 'Présent': ['falo', 'fala', 'falamos', 'falam'], 'Passé (perfeito)': ['falei', 'falou', 'falamos', 'falaram'], 'Futur': ['falarei', 'falará', 'falaremos', 'falarão'] } },
  { inf: 'comer', fr: 'manger', f: { 'Présent': ['como', 'come', 'comemos', 'comem'], 'Passé (perfeito)': ['comi', 'comeu', 'comemos', 'comeram'], 'Futur': ['comerei', 'comerá', 'comeremos', 'comerão'] } },
  { inf: 'abrir', fr: 'ouvrir', f: { 'Présent': ['abro', 'abre', 'abrimos', 'abrem'], 'Passé (perfeito)': ['abri', 'abriu', 'abrimos', 'abriram'], 'Futur': ['abrirei', 'abrirá', 'abriremos', 'abrirão'] } },
  { inf: 'ser', fr: 'être (essence)', f: { 'Présent': ['sou', 'é', 'somos', 'são'], 'Passé (perfeito)': ['fui', 'foi', 'fomos', 'foram'], 'Futur': ['serei', 'será', 'seremos', 'serão'] } },
  { inf: 'estar', fr: 'être (état)', f: { 'Présent': ['estou', 'está', 'estamos', 'estão'], 'Passé (perfeito)': ['estive', 'esteve', 'estivemos', 'estiveram'], 'Futur': ['estarei', 'estará', 'estaremos', 'estarão'] } },
  { inf: 'ter', fr: 'avoir', f: { 'Présent': ['tenho', 'tem', 'temos', 'têm'], 'Passé (perfeito)': ['tive', 'teve', 'tivemos', 'tiveram'], 'Futur': ['terei', 'terá', 'teremos', 'terão'] } },
  { inf: 'ir', fr: 'aller', f: { 'Présent': ['vou', 'vai', 'vamos', 'vão'], 'Passé (perfeito)': ['fui', 'foi', 'fomos', 'foram'], 'Futur': ['irei', 'irá', 'iremos', 'irão'] } },
  { inf: 'fazer', fr: 'faire', f: { 'Présent': ['faço', 'faz', 'fazemos', 'fazem'], 'Passé (perfeito)': ['fiz', 'fez', 'fizemos', 'fizeram'], 'Futur': ['farei', 'fará', 'faremos', 'farão'] } },
  { inf: 'querer', fr: 'vouloir', f: { 'Présent': ['quero', 'quer', 'queremos', 'querem'], 'Passé (perfeito)': ['quis', 'quis', 'quisemos', 'quiseram'], 'Futur': ['quererei', 'quererá', 'quereremos', 'quererão'] } },
  { inf: 'poder', fr: 'pouvoir', f: { 'Présent': ['posso', 'pode', 'podemos', 'podem'], 'Passé (perfeito)': ['pude', 'pôde', 'pudemos', 'puderam'], 'Futur': ['poderei', 'poderá', 'poderemos', 'poderão'] } },
]

const PHRASES = [
  { fr: 'Je voudrais réserver une table', pt: 'Eu gostaria de reservar uma mesa', pron: 'éou goustaria dji rézèrvar ouma méza' },
  { fr: 'Pouvez-vous m’aider ?', pt: 'Você pode me ajudar?', pron: 'vossê podji mi ajoudar' },
  { fr: 'Je ne suis pas d’accord', pt: 'Eu não concordo', pron: 'éou nãou konnkordou' },
  { fr: 'À mon avis…', pt: 'Na minha opinião…', pron: 'na minia opiniãou' },
  { fr: 'Qu’en penses-tu ?', pt: 'O que você acha?', pron: 'ou ki vossê acha' },
  { fr: 'Je suis en retard', pt: 'Estou atrasado', pron: 'estô atrazadou' },
  { fr: 'Ce n’est pas grave', pt: 'Não tem problema', pron: 'nãou téinn probléma' },
  { fr: 'On peut se tutoyer ?', pt: 'Pode me chamar de você?', pron: 'podji mi chamar dji vossê' },
  { fr: 'Je n’ai pas compris, pouvez-vous répéter ?', pt: 'Não entendi, pode repetir?', pron: 'nãou inntènndji podji répétchir' },
  { fr: 'J’ai besoin d’aide', pt: 'Eu preciso de ajuda', pron: 'éou prézizou dji ajouda' },
  { fr: 'On se voit demain', pt: 'A gente se vê amanhã', pron: 'a jènntchi si vê amaniã' },
  { fr: 'Je suis content de te voir', pt: 'Estou feliz em te ver', pron: 'estô félis einn tchi vér' },
]

const DIALOGUES = [
  {
    titre: 'Au restaurant',
    lignes: [
      { qui: 'Serveur', pt: 'Boa noite! Mesa para quantas pessoas?', fr: 'Bonsoir ! Une table pour combien de personnes ?' },
      { qui: 'Vous', pt: 'Para duas, por favor.', fr: 'Pour deux, s’il vous plaît.' },
      { qui: 'Serveur', pt: 'O que vão querer beber?', fr: 'Que voulez-vous boire ?' },
      { qui: 'Vous', pt: 'Uma água e uma cerveja, por favor.', fr: 'Une eau et une bière, s’il vous plaît.' },
      { qui: 'Vous', pt: 'A conta, por favor.', fr: 'L’addition, s’il vous plaît.' },
    ],
  },
  {
    titre: 'Faire connaissance',
    lignes: [
      { qui: 'A', pt: 'Oi! Tudo bem?', fr: 'Salut ! Ça va ?' },
      { qui: 'B', pt: 'Tudo ótimo, e você?', fr: 'Très bien, et toi ?' },
      { qui: 'A', pt: 'De onde você é?', fr: 'Tu viens d’où ?' },
      { qui: 'B', pt: 'Eu sou da França. E você?', fr: 'Je viens de France. Et toi ?' },
      { qui: 'A', pt: 'Eu sou do Brasil. Prazer!', fr: 'Je viens du Brésil. Enchanté !' },
    ],
  },
]

const ALL_WORDS = VOCAB.flatMap((c) => c.mots)

/* --------------------------------------------------------------- helpers */

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function speak(texte) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(texte)
  u.lang = 'pt-BR'
  u.rate = 0.9
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}

function Speak({ texte }) {
  return (
    <button
      className="speak"
      onClick={(e) => {
        e.stopPropagation()
        speak(texte)
      }}
      aria-label={`Écouter : ${texte}`}
      title="Écouter"
    >
      🔊
    </button>
  )
}

/* ------------------------------------------------------------ Vocabulaire */

function Vocabulaire() {
  const [catIdx, setCatIdx] = useState(0)
  const deck = useMemo(() => shuffle(VOCAB[catIdx].mots), [catIdx])
  const [pos, setPos] = useState(0)
  const [face, setFace] = useState('fr')

  const mot = deck[pos]
  const go = (d) => {
    setFace('fr')
    setPos((p) => (p + d + deck.length) % deck.length)
  }

  return (
    <div>
      <div className="chips">
        {VOCAB.map((c, i) => (
          <button
            key={c.nom}
            className={'chip' + (i === catIdx ? ' chip-on' : '')}
            onClick={() => {
              setCatIdx(i)
              setPos(0)
              setFace('fr')
            }}
          >
            {c.nom}
          </button>
        ))}
      </div>

      <div
        className="carte"
        onClick={() => setFace((f) => (f === 'fr' ? 'pt' : 'fr'))}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setFace((f) => (f === 'fr' ? 'pt' : 'fr'))
        }}
      >
        {face === 'fr' ? (
          <>
            <span className="carte-lang">Français</span>
            <span className="carte-mot">{mot.fr}</span>
            <span className="carte-aide">Touche la carte pour la réponse</span>
          </>
        ) : (
          <>
            <span className="carte-lang">Português (BR)</span>
            <span className="carte-mot">
              {mot.pt} <Speak texte={mot.pt} />
            </span>
            <span className="carte-pron">[ {mot.pron} ]</span>
          </>
        )}
      </div>

      <div className="nav">
        <button className="btn" onClick={() => go(-1)}>← Précédent</button>
        <span className="compteur">{pos + 1} / {deck.length}</span>
        <button className="btn" onClick={() => go(1)}>Suivant →</button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ Conjugaison */

function Conjugaison() {
  const [vIdx, setVIdx] = useState(0)
  const [temps, setTemps] = useState(TEMPS[0])
  const v = VERBS[vIdx]
  const formes = v.f[temps]

  return (
    <div>
      <label className="lbl">Verbe</label>
      <select className="select" value={vIdx} onChange={(e) => setVIdx(Number(e.target.value))}>
        {VERBS.map((vb, i) => (
          <option key={vb.inf} value={i}>
            {vb.inf} — {vb.fr}
          </option>
        ))}
      </select>

      <div className="chips" style={{ marginTop: '0.9rem' }}>
        {TEMPS.map((t) => (
          <button
            key={t}
            className={'chip' + (t === temps ? ' chip-on' : '')}
            onClick={() => setTemps(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <table className="conj">
        <tbody>
          {PRONOMS.map((p, i) => (
            <tr key={p}>
              <td className="conj-p">{p}</td>
              <td className="conj-v">
                {formes[i]} <Speak texte={`${p.split(' ')[0]} ${formes[i]}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="note">
        Pronoms BR usuels : <em>você</em> = tu (forme polie courante),
        <em> a gente</em> ≈ <em>nós</em> à l'oral.
      </p>
    </div>
  )
}

/* ----------------------------------------------------- Phrases & dialogues */

function PhrasesDialogues() {
  const [vue, setVue] = useState('phrases')
  return (
    <div>
      <div className="chips">
        <button className={'chip' + (vue === 'phrases' ? ' chip-on' : '')} onClick={() => setVue('phrases')}>
          Phrases utiles
        </button>
        <button className={'chip' + (vue === 'dialogues' ? ' chip-on' : '')} onClick={() => setVue('dialogues')}>
          Dialogues
        </button>
      </div>

      {vue === 'phrases' ? (
        <ul className="phrases">
          {PHRASES.map((p) => (
            <li key={p.pt} className="phrase">
              <div className="phrase-fr">{p.fr}</div>
              <div className="phrase-pt">
                {p.pt} <Speak texte={p.pt} />
              </div>
              <div className="phrase-pron">[ {p.pron} ]</div>
            </li>
          ))}
        </ul>
      ) : (
        DIALOGUES.map((d) => (
          <div key={d.titre} className="dialogue">
            <h3 className="dialogue-titre">{d.titre}</h3>
            {d.lignes.map((l, i) => (
              <div key={i} className="ligne">
                <span className="qui">{l.qui}</span>
                <div>
                  <div className="phrase-pt">
                    {l.pt} <Speak texte={l.pt} />
                  </div>
                  <div className="phrase-fr">{l.fr}</div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}

/* -------------------------------------------------------------- Exercices */

function qVocab(sens) {
  const bonne = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)]
  const champ = sens === 'fr2pt' ? 'pt' : 'fr'
  const enonce = sens === 'fr2pt' ? bonne.fr : bonne.pt
  const distract = shuffle(ALL_WORDS.filter((w) => w[champ] !== bonne[champ])).slice(0, 3)
  return {
    type: 'vocab',
    enonce,
    consigne: sens === 'fr2pt' ? 'Traduis en portugais :' : 'Traduis en français :',
    options: shuffle([bonne, ...distract]).map((w) => w[champ]),
    bonneRep: bonne[champ],
  }
}

function qConj() {
  const v = VERBS[Math.floor(Math.random() * VERBS.length)]
  const t = TEMPS[Math.floor(Math.random() * TEMPS.length)]
  const pi = Math.floor(Math.random() * PRONOMS.length)
  const bonne = v.f[t][pi]
  const pool = []
  VERBS.forEach((vb) => TEMPS.forEach((tt) => vb.f[tt].forEach((x) => pool.push(x))))
  const distract = shuffle([...new Set(pool)].filter((x) => x !== bonne)).slice(0, 3)
  return {
    type: 'conj',
    enonce: `${v.inf} (${v.fr}) — ${t} — « ${PRONOMS[pi]} »`,
    consigne: 'Choisis la forme correcte :',
    options: shuffle([bonne, ...distract]),
    bonneRep: bonne,
  }
}

function Exercices() {
  const [mode, setMode] = useState('vocab')
  const [sens, setSens] = useState('fr2pt')
  const [q, setQ] = useState(() => qVocab('fr2pt'))
  const [choix, setChoix] = useState(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  const tirer = (m = mode, s = sens) => {
    setChoix(null)
    setQ(m === 'vocab' ? qVocab(s) : qConj())
  }
  const changerMode = (m) => {
    setMode(m)
    setScore(0)
    setTotal(0)
    setChoix(null)
    setQ(m === 'vocab' ? qVocab(sens) : qConj())
  }
  const repondre = (opt) => {
    if (choix !== null) return
    setChoix(opt)
    setTotal((t) => t + 1)
    if (opt === q.bonneRep) setScore((s) => s + 1)
  }

  return (
    <div>
      <div className="chips">
        <button className={'chip' + (mode === 'vocab' ? ' chip-on' : '')} onClick={() => changerMode('vocab')}>
          Vocabulaire
        </button>
        <button className={'chip' + (mode === 'conj' ? ' chip-on' : '')} onClick={() => changerMode('conj')}>
          Conjugaison
        </button>
      </div>

      {mode === 'vocab' && (
        <div className="chips" style={{ marginTop: '0.5rem' }}>
          <button
            className={'chip' + (sens === 'fr2pt' ? ' chip-on' : '')}
            onClick={() => {
              setSens('fr2pt')
              tirer('vocab', 'fr2pt')
            }}
          >
            FR → PT
          </button>
          <button
            className={'chip' + (sens === 'pt2fr' ? ' chip-on' : '')}
            onClick={() => {
              setSens('pt2fr')
              tirer('vocab', 'pt2fr')
            }}
          >
            PT → FR
          </button>
        </div>
      )}

      <div className="score">Score : <strong>{score}</strong> / {total}</div>
      <p className="consigne">{q.consigne}</p>
      <p className="question">« {q.enonce} »</p>

      <div className="options">
        {q.options.map((opt) => {
          let cls = 'option'
          if (choix !== null) {
            if (opt === q.bonneRep) cls += ' option-ok'
            else if (opt === choix) cls += ' option-ko'
          }
          return (
            <button key={opt} className={cls} onClick={() => repondre(opt)} disabled={choix !== null}>
              {opt}
            </button>
          )
        })}
      </div>

      {choix !== null && (
        <div className="feedback">
          {choix === q.bonneRep ? (
            <span className="bon">✅ Correct !</span>
          ) : (
            <span className="mauvais">
              ❌ Réponse : <strong>{q.bonneRep}</strong>
            </span>
          )}{' '}
          <Speak texte={q.bonneRep} />
          <button className="btn btn-primary" onClick={() => tirer()}>
            Suivant →
          </button>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------- App */

const ONGLETS = [
  ['vocab', 'Vocabulaire'],
  ['conj', 'Conjugaison'],
  ['phr', 'Phrases'],
  ['ex', 'Exercices'],
]

export default function App() {
  const [tab, setTab] = useState('vocab')
  return (
    <div className="app">
      <header>
        <h1>🇧🇷 Portugais du Brésil</h1>
        <p className="sous-titre">
          Niveau intermédiaire — vocabulaire, conjugaison, phrases &
          dialogues, exercices. Hors-ligne, sans compte.
        </p>
      </header>

      <nav className="tabs">
        {ONGLETS.map(([id, label]) => (
          <button
            key={id}
            className={'tab' + (tab === id ? ' tab-on' : '')}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'vocab' && <Vocabulaire />}
        {tab === 'conj' && <Conjugaison />}
        {tab === 'phr' && <PhrasesDialogues />}
        {tab === 'ex' && <Exercices />}
      </main>

      <footer>Bons progrès — Bons estudos ! 🎉</footer>
    </div>
  )
}
