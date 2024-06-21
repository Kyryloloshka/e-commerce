import { Button } from "@/components/ui/button";

const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-[1] bg-gray-500/20 hover:bg-gray-500/40"
      variant={"circle"}
      size={"circle"}
      onClick={onClick}
    >
      <i className="_icon-right-arrow text-sm rotate-180 text-dark-6"></i>
    </Button>
  );
};

export default PrevArrow;