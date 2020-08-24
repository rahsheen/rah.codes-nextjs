import React from "react";
import { useQuery, DocumentNode } from "@apollo/react-hooks";

interface Props {
  children: any;
  query: DocumentNode;
  id?: string;
}

const Query = ({ children, query, id }: Props) => {
  const { data, loading, error } = useQuery(query, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return children({ data });
};

export default Query;
