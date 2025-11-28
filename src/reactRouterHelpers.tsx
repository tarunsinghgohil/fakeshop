import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export function withRouterParams<T extends object>(Component: React.ComponentType<any>) {
  return (props:any) => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} params={params} navigate={navigate} location={location} />;
  }
}
