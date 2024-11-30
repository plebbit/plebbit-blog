import useWindowWidth from './use-window-width';

const useIsMobile = () => {
  const windowWidth = useWindowWidth();
  return windowWidth < 1111;
};

export default useIsMobile;
