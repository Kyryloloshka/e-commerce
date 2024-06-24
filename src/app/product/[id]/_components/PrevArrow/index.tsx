import { Button } from "@/components/ui/button";

const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      className="absolute left-0 top-1/2 transform text-dark-6 -translate-y-1/2 bg-light-6 hover:bg-[#ff70aeaa] hover:text-light-1 z-[1]"
      variant={"circle"}
      size={"circle"}
      onClick={onClick}
    >
      <i className="_icon-right-arrow text-sm rotate-180"></i>
    </Button>
  );
};

export default PrevArrow;
