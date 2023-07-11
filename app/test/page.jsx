"use client";

import { useState } from 'react';
import Head from 'next/head'

export default function Home() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    const formData = new FormData();

    for ( const file of fileInput.files ) {
      console.log(file);
      formData.append('file', file);
    }

    // formData.append('upload_preset', 'prs_preset');

    // const data = await fetch('https://api.cloudinary.com/v1_1/prtracker/video/upload', {
    //   method: 'POST',
    //   body: formData
    // }).then(r => r.json());

    // console.log(data.url);
    // setImageSrc(data.secure_url);
    // setUploadData(data);
  }

  return (
    <div>
      <Head>
        <title>Image Uploader</title>
        <meta name="description" content="Upload your image to Cloudinary!" />
      </Head>

      <main>
        <h1>
          Image Uploader
        </h1>

        <p>
          Upload your image to Cloudinary!
        </p>

        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>
          
          <img src={imageSrc} />
          
          {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )}

          {uploadData && (
            <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
          )}
        </form>
      </main>

      <footer>
        <p>Find the tutorial on <a href="https://spacejelly.dev/">spacejelly.dev</a>!</p>
      </footer>
    </div>
  )
}