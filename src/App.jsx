import React, { useMemo, useState } from 'react'

const CATEGORIES = [
  {
    nom: 'Salutations',
    mots: [
      { fr: 'Bonjour', pt: 'Bom dia', pron: 'bonn djia' },
      { fr: 'Bonsoir', pt: 'Boa noite', pron: 'boa noïtchi' },
      { fr: 'Salut', pt: 'Oi', pron: 'oï' },
      { fr: 'Au revoir', pt: 'Tchau', pron: 'tchaou' },
      { fr: 'Merci', pt: 'Obrigado', pron: 'obrigadou' },
      { fr: "S'il vous plaît", pt: 'Por favor', pron: 'pour favôr' },
      { fr: 'Excusez-moi', pt: 'Com licença', pron: 'konm lissensa' },
      { fr: 'Oui / Non', pt: 'Sim / Não', pron: 'sinn / nãou' },
    ],
  },
  {
    nom: 'Nombres',
    mots: [
      { fr: 'Un', pt: 'Um', pron: 'oun' },
      { fr: 'Deux', pt: 'Dois', pron: 'doïs' },
      { fr: 'Trois', pt: 'Três', pron: 'très' },
      { fr: 'Quatre', pt: 'Quatro', pron: 'kouatrou' },
      { fr: 'Cinq', pt: 'Cinco', pron: 'sinnkou' },
      { fr: 'Dix', pt: 'Dez', pron: 'dès' },
      { fr: 'Cent', pt: 'Cem', pron: 'seinn' },
      { fr: 'Mille', pt: 'Mil', pron: 'miou' },
    ],
  },
  {
    nom: 'Voyage',
    mots: [
      { fr: 'Aéroport', pt: 'Aeroporto', pron: 'aéropôrtou' },
      { fr: 'Avion', pt: 'Avião', pron: 'aviãou' },
      { fr: 'Billet', pt: 'Bilhete', pron: 'biliétchi' },
      { fr: 'Hôtel', pt: 'Hotel', pron: 'otèou' },
      { fr: 'Plage', pt: 'Praia', pron: 'praïa' },
      { fr: 'Train', pt: 'Trem', pron: 'treinn' },
      { fr: 'Taxi', pt: 'Táxi', pron: 'taksi' },
      { fr: 'Où est… ?', pt: 'Onde fica… ?', pron: 'ondji fika' },
    ],
  },
  {
    nom: 'Restaurant',
    mots: [
      { fr: 'Eau', pt: 'Água', pron: 'agoua' },
      { fr: 'Bière', pt: 'Cerveja', pron: 'sèrvéja' },
      { fr: 'Café', pt: 'Café', pron: 'kafé' },
      { fr: "L'addition", pt: 'A conta', pron: 'a konnta' },
      { fr: 'Manger', pt: 'Comer', pron: 'komér' },
      { fr: 'Boire', pt: 'Beber', pron: 'bébér' },
      { fr: 'Délicieux', pt: 'Delicioso', pron: 'délissiôzou' },
      { fr: 'Le menu', pt: 'O cardápio', pron: 'ou kardapiou' },
    ],
  },
  {
    nom: 'Au quotidien',
    mots: [
      { fr: 'Maison', pt: 'Casa', pron: 'kaza' },
      { fr: 'Ami', pt: 'Amigo', pron: 'amigou' },
      { fr: "Aujourd'hui", pt: 'Hoje', pron: 'ôji' },
      { fr: 'Demain', pt: 'Amanhã', pron: 'amaniã' },
      { fr: 'Aimer', pt: 'Gostar', pron: 'goustar' },
      { fr: 'Parler', pt: 'Falar', pron: 'falar' },
      { fr: 'Comprendre', pt: 'Entender', pron: 'intendér' },
      { fr: 'Je ne comprends pas', pt: 'Não entendo', pron: 'nãou intendou' },
    ],
  },
]

const PHRASES = [
  { fr: 'Comment ça va ?', pt: 'Tudo bem?', pron: 'toudou beinn' },
  { fr: "Je m'appelle…", pt: 'Meu nome é…', pron: 'méou nomi é' },
  { fr: 'Je ne parle pas portugais', pt: 'Não falo português', pron: 'nãou falou pourtouguês' },
  { fr: 'Combien ça coûte ?', pt: 'Quanto custa?', pron: 'kouantou kousta' },
  { fr: 'Je voudrais…', pt: 'Eu queria…', pron: 'éou kéria' },
  { fr: 'Où sont les toilettes ?', pt: 'Onde fica o banheiro?', pron: 'ondji fika ou baniéirou' },
  { fr: 'Parlez-vous français ?', pt: 'Você fala francês?', pron: 'vossê fala fransês' },
  { fr: 'Enchanté(e)', pt: 'Prazer', pron: 'prazér' },
  { fr: 'Bonne journée', pt: 'Tenha um bom dia', pron: 'tégna oun bonn djia' },
  { fr: "Aidez-moi, s'il vous plaît", pt: 'Me ajuda, por favor', pron: 'mi ajouda pour favôr' },
]

const ALL_WORDS = CATEGORIES.flatMap((c) => c.mots)

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

function SpeakButton({ texte }) {
  return (
    <button
      className="speak"
      onClick={(e) => {
        e.stopPropagation()
        speak(texte)
      }}
      aria-label={`Écouter : ${texte}`}
      title="Écouter la prononciation"
    >
      🔊
    </button>
  )
}

function Cartes() {
  const [catIdx, setCatIdx] = useState(0)
  const deck = useMemo(() => shuffle(CATEGORIES[catIdx].mots), [catIdx])
  const [pos, setPos] = useState(0)
  const [face, setFace] = useState('fr')

  const mot = deck[pos]
  const go = (delta) => {
    setFace('fr')
    setPos((p) => (p + delta + deck.length) % deck.length)
  }

  return (
    <div>
      <div className="chips">
        {CATEGORIES.map((c, i) => (
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
            <span className="carte-aide">Touche la carte pour voir la réponse</span>
          </>
        ) : (
          <>
            <span className="carte-lang">Português (BR)</span>
            <span className="carte-mot">
              {mot.pt} <SpeakButton texte={mot.pt} />
            </span>
            <span className="carte-pron">[ {mot.pron} ]</span>
          </>
        )}
      </div>

      <div className="nav">
        <button className="btn" onClick={() => go(-1)}>← Précédent</button>
        <span className="compteur">
          {pos + 1} / {deck.length}
        </span>
        <button className="btn" onClick={() => go(1)}>Suivant →</button>
      </div>
    </div>
  )
}

function nouvelleQuestion() {
  const bonne = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)]
  const distracteurs = shuffle(ALL_WORDS.filter((w) => w.pt !== bonne.pt)).slice(0, 3)
  return { bonne, options: shuffle([bonne, ...distracteurs]) }
}

function Quiz() {
  const [q, setQ] = useState(() => nouvelleQuestion())
  const [choix, setChoix] = useState(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)

  const repondre = (opt) => {
    if (choix) return
    setChoix(opt)
    setTotal((t) => t + 1)
    if (opt.pt === q.bonne.pt) setScore((s) => s + 1)
  }

  const suivante = () => {
    setChoix(null)
    setQ(nouvelleQuestion())
  }

  return (
    <div>
      <div className="score">
        Score : <strong>{score}</strong> / {total}
      </div>
      <p className="consigne">Comment dit-on en portugais du Brésil :</p>
      <p className="question">« {q.bonne.fr} »</p>

      <div className="options">
        {q.options.map((opt) => {
          let cls = 'option'
          if (choix) {
            if (opt.pt === q.bonne.pt) cls += ' option-ok'
            else if (opt.pt === choix.pt) cls += ' option-ko'
          }
          return (
            <button key={opt.pt} className={cls} onClick={() => repondre(opt)} disabled={!!choix}>
              {opt.pt}
            </button>
          )
        })}
      </div>

      {choix && (
        <div className="feedback">
          {choix.pt === q.bonne.pt ? (
            <span className="bon">✅ Correct !</span>
          ) : (
            <span className="mauvais">
              ❌ La réponse était : <strong>{q.bonne.pt}</strong>
            </span>
          )}{' '}
          <SpeakButton texte={q.bonne.pt} />
          <button className="btn btn-primary" onClick={suivante}>
            Question suivante →
          </button>
        </div>
      )}
    </div>
  )
}

function Phrases() {
  return (
    <ul className="phrases">
      {PHRASES.map((p) => (
        <li key={p.pt} className="phrase">
          <div className="phrase-fr">{p.fr}</div>
          <div className="phrase-pt">
            {p.pt} <SpeakButton texte={p.pt} />
          </div>
          <div className="phrase-pron">[ {p.pron} ]</div>
        </li>
      ))}
    </ul>
  )
}

export default function App() {
  const [tab, setTab] = useState('cartes')

  return (
    <div className="app">
      <header>
        <h1>🇧🇷 Apprendre le portugais du Brésil</h1>
        <p className="sous-titre">
          Vocabulaire et phrases essentielles, avec prononciation. Aucune
          connexion ni compte requis.
        </p>
      </header>

      <nav className="tabs">
        <button className={'tab' + (tab === 'cartes' ? ' tab-on' : '')} onClick={() => setTab('cartes')}>
          Cartes
        </button>
        <button className={'tab' + (tab === 'quiz' ? ' tab-on' : '')} onClick={() => setTab('quiz')}>
          Quiz
        </button>
        <button className={'tab' + (tab === 'phrases' ? ' tab-on' : '')} onClick={() => setTab('phrases')}>
          Phrases
        </button>
      </nav>

      <main>
        {tab === 'cartes' && <Cartes />}
        {tab === 'quiz' && <Quiz />}
        {tab === 'phrases' && <Phrases />}
      </main>

      <footer>Bons apprentissages — Boa sorte ! 🎉</footer>
    </div>
  )
}
