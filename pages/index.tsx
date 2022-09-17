import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export interface HomeProps {
  solution: string;
}

const Home: NextPage<HomeProps> = props => {
  return (
    <div className={styles.container}>
      <Head>
        <title>wordle</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          wordle
        </h1>
        <p className={styles.description}>
          <code className={styles.code}>{props.solution}</code>
        </p>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {

  const res = await fetch("https://wordle-api.elijahcobb.com");
  const { solution } = await res.json()

  return {
    props: {
      solution
    }
  }
}