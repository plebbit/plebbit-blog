import useWindowWidth from './use-window-width';

const useIsMobile = () => {
  const windowWidth = useWindowWidth();
  return windowWidth < 940;
};

export default useIsMobile;
