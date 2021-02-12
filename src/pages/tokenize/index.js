import { useRouter } from "next/router";

const tokenize = () => {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h1>loading....</h1>
    </div>
  );
};

export default tokenize;
