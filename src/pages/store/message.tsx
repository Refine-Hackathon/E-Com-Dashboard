import { MuiInferencer } from '@pankod/refine-inferencer/mui'
import React from 'react'
import { useState } from "react";
import { useForm } from "@pankod/refine-core";
function Message() {



  const [title, setTitle] = useState('');
  const { onFinish } = useForm({
    action: "create",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    onFinish({ title });
  };

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );

}

export default Message