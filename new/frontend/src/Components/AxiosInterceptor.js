import { useEffect } from 'react';
import { useLoading } from '../Context/LoadingContext';
import api from '../api/axiosConfig';

const AxiosInterceptor = ({ children }) => {
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        const reqInterceptor = api.interceptors.request.use(
            (config) => {
                startLoading();
                return config;
            },
            (error) => {
                startLoading(); // Count as request start to keep UI consistent if needed, but usually error happens on start or finish
                return Promise.reject(error);
            }
        );

        const resInterceptor = api.interceptors.response.use(
            (response) => {
                stopLoading();
                return response;
            },
            (error) => {
                stopLoading();
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(reqInterceptor);
            api.interceptors.response.eject(resInterceptor);
        };
    }, [startLoading, stopLoading]);

    return children;
};

export default AxiosInterceptor;
