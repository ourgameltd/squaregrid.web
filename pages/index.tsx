import styles from "./index.module.css";
import { AssociationStaffTypes, AssociationStaffTypesApi, Configuration } from "../api/_generated";
import { useState, useEffect } from 'react'
import Head from "next/head";

const configuration = new Configuration({
  basePath: "/data-api/rest",
});

const associationStaffTypesApi = new AssociationStaffTypesApi(configuration);

export default function Home() {
  const [associationStaffTypes, setAssociationStaffTypes] = useState<Array<AssociationStaffTypes>>([]);

  const getData = async () => {
    let response = await associationStaffTypesApi.associationStaffTypesGet();
    setAssociationStaffTypes(response.value ?? []);
  };

  useEffect(() => { getData(); }, []);

  return (
    <>
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Found <span className={styles.code}>{associationStaffTypes.length}</span> association staff types
        </p>
        <a href="/.auth/logout">Logout</a>
      </div>
    </main>
    </>
  );
}
