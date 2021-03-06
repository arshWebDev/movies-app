import { TrendingCard } from "../cards";

const TrendingOrder = ({ data, activeNum, setActiveNum }) => {
  return (
    <div className="hidden lg:flex gap-4 items-center">
      <TrendingCard
        data={data[activeNum === 0 ? 15 : activeNum - 1]}
        setActiveNum={setActiveNum}
        dataNum={activeNum === 0 ? 15 : activeNum - 1}
      />
      <TrendingCard
        data={data[activeNum]}
        active={true}
        setActiveNum={setActiveNum}
        dataNum={activeNum}
      />
      <TrendingCard
        data={data[activeNum === 15 ? 0 : activeNum + 1]}
        setActiveNum={setActiveNum}
        dataNum={activeNum === 15 ? 0 : activeNum + 1}
      />
    </div>
  );
};

export default TrendingOrder;
