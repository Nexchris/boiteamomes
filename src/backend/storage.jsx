import React, { useEffect, useState } from 'react';
import { storage } from '../firebaseConfig';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from '../asset/footer';

function Storage() {
  const [buckets, setBuckets] = useState([]);
  const [files, setFiles] = useState({});

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const bucketsRef = ref(storage);
        const bucketsList = await listAll(bucketsRef);
        const bucketsArray = bucketsList.items.map((bucket) => bucket.name);
        setBuckets(bucketsArray);
      } catch (error) {
        console.error("Error fetching buckets:", error);
      }
    };

    fetchBuckets();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const filesObject = {};
        for (const bucket of buckets) {
          const filesRef = ref(storage, bucket);
          const filesList = await listAll(filesRef);
          const filesArray = filesList.items.map((file) => file.name);
          filesObject[bucket] = filesArray;
        }
        setFiles(filesObject);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [buckets]);

  return (
    <div>

      <h1>Firebase Storage</h1>
      <ul>
        {buckets.map((bucket) => (
          <li key={bucket}>
            <h2>{bucket}</h2>
            <ul>
              {files[bucket].map((file) => (
                <li key={file}>
                  <a href={getDownloadURL(ref(storage, `${bucket}/${file}`))}>
                    {file}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default Storage;