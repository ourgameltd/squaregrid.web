import styles from "./index.module.css";
import { AssociationStaffType, AssociationStaffTypesApi, Configuration } from "../src/api/_generated";
import { useState, useEffect } from 'react'
import Head from "next/head";

const configuration = new Configuration({
  basePath: "/data-api/rest",
});

const associationStaffTypesApi = new AssociationStaffTypesApi(configuration);

export default function Home() {
  const [associationStaffTypes, setAssociationStaffTypes] = useState<Array<AssociationStaffType>>([]);

  const getData = async () => {
    let response = await associationStaffTypesApi.searchAssociationStaffTypes();
    setAssociationStaffTypes(response ?? []);
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
