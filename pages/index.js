import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { sanityClient, urlFor } from "../lib/sanity";

const recipesQuery = `*[_type == "recipe"]{
  _id,
  name,
  slug,
  mainImage
}`;

export default function Home({ recipes }) {
  console.log(recipes);
  return (
    <div className={styles.container}>
      <Head>
        <title>Chunguito&apos;s Kitchen</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1> Recetas 🌮</h1>

      <ul className="recipes-list">
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-card">
              <Link
                className="item-container"
                href={`/recipes/${recipe.slug.current}`}
              >
                <a>
                  {/* <Image></Image> */}
                  <img src={urlFor(recipe.mainImage).url()} alt={recipe.name} />
                  <span>{recipe.name}</span>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipesQuery);
  return { props: { recipes } };
}
