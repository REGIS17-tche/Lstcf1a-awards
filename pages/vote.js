import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const categories = [
  { title: "Le plus beau", intro: "Celui dont le charme illumine la soirée." },
  { title: "La plus belle", intro: "Celle qui fait tourner toutes les têtes." },
  { title: "La plus douce", intro: "La gentillesse incarnée dans un sourire." },
  { title: "Le/la plus frais/plus fraîche (les meilleurs outfit)", intro: "Le style et la fraîcheur réunis avec élégance." },
  { title: "Le/la plus intelligent/plus intelligente", intro: "L’esprit brillant qui inspire tous." },
  { title: "Le/la plus drôle", intro: "Celui ou celle qui fait rire sans retenue." },
  { title: "Le/la plus en retard", intro: "Maître incontesté(e) de l’arrivée tardive." },
  { title: "Le/la plus charismatique", intro: "Une aura qui captive la salle entière." },
  { title: "Le meilleur surnom", intro: "Le surnom qui restera dans les mémoires." },
];

export default function Vote() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [votes, setVotes] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('lstcf1aName');
    if (!storedName) {
      router.replace('/');
    } else {
      setName(storedName);
    }
  }, [router]);

  const handleChange = (category, value) => {
    setVotes(prev => ({ ...prev, [category]: value }));
  };

  const allFilled = categories.every(c => votes[c.title] && votes[c.title].trim() !== '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled) return;

    try {
      const response = await fetch('/api/sendVote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, votes }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Une erreur est survenue lors de l'enregistrement du vote.");
      }
    } catch (error) {
      alert("Une erreur réseau est survenue, merci de réessayer.");
      console.error(error);
    }
  };

  if (!name) return null; // ou un loader

  return (
    <>
      <Head>
        <title>Votez - LSTCF1A Awards</title>
        <meta name="description" content="Votez pour les catégories du LSTCF1A Awards" />
      </Head>

      <div className={styles.container}>
        <div className={styles.overlay} />

        <div className={styles.content}>
          <img src="/trophee.png" alt="Trophée" className={styles.trophee} />

          {!submitted ? (
            <>
              <h1 className={styles.title}>Bienvenue {name} !</h1>
              <form onSubmit={handleSubmit} className={styles.form}>
                {categories.map(({ title, intro }) => (
                  <div key={title} className={styles.category}>
                    <label htmlFor={title} className={styles.label}>{title}</label>
                    <p className={styles.intro}>{intro}</p>
                    <input
                      id={title}
                      type="text"
                      placeholder={`Votre choix pour "${title}"`}
                      value={votes[title] || ''}
                      onChange={(e) => handleChange(title, e.target.value)}
                      required
                      autoComplete="off"
                      className={styles.input}
                    />
                  </div>
                ))}

                <button type="submit" disabled={!allFilled} className={styles.voteButton}>
                  Envoyer mes votes
                </button>
              </form>
            </>
          ) : (
            <div className={styles.thankYou}>
              <p>Merci beaucoup {name} ! Votre voix a été entendue, et elle brillera parmi les étoiles de la LSTCF1A..</p>
              <p>Le destin des étoiles est entre nos mains bonne soirée aux Awards et à très bientôt pour les résultats ! 🌟</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}