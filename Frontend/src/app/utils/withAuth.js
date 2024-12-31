
"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);

      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login"
      } else {
        setLoading(false);
      }
    }, []);
    if (!isClient || loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
