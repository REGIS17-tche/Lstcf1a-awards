import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('lstcf1aName');
    if (storedName) {
      setName(storedName);
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      localStorage.setItem('lstcf1aName', name.trim());
      setSubmitted(true);
    }
  };

  return (
    <>
      <Head>
        <title>LSTCF1A Awards</title>
        <meta name="description" content="La grande soirée des Oscars version LSTCF1A" />
      </Head>

      <div className={styles.container}>
        <div className={styles.overlay} />

        <div className={styles.content}>
          <Image
            src="/trophee.png"
            alt="Trophée des Oscars"
            width={120}
            height={120}
            className={styles.trophee}
          />

          <h1 className={styles.title}>LSTCF1A Awards</h1>

          {!submitted ? (
            <>
              <p className={styles.subtitle}>
                Bienvenue à la cérémonie la plus attendue de l&apos;année...
              </p>

              <p className={styles.description}>
                Ce soir, les étoiles brillent un peu plus fort. Dans un cadre chic, sous une pluie d&apos;étoiles dorées, nous
                rendons hommage aux talents, à l&apos;humour, à l&apos;élégance et à l&apos;esprit de la classe LSTCF1A.
                <br /><br />
                Préparez vos discours, ajustez vos tenues, et laissez la magie opérer. Chaque instant compte, chaque
                vote fait la différence. 🎬
              </p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Votre prénom"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="off"
                />
                <button type="submit" className={styles.voteButton}>
                  Entrer et voter
                </button>
              </form>
            </>
          ) : (
            <>
              <p className={styles.thankYou}>
                Merci {name} ! Vous pouvez maintenant accéder au vote.
              </p>
              <Link href="/vote" className={styles.voteLink}>
                Accéder au vote
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}