import List from "../components/List";
import OptionsBar from "../components/OptionsBar";
import Trending from "../components/Trending";

import { SideBar, NavBar, BottomNav } from "../components/sections";

const Home = () => {
  return (
    <main className="flex h-screen w-full">
      <SideBar />

      <section className="w-full pb-32 sm:pb-16 overflow-x-hidden overflow-y-auto scrollbar">
        <NavBar />

        <div className="mt-0">
          <OptionsBar />
          <Trending type="all" />

          <div className="flex flex-col gap-8">
            <List type="person" query="popular" pages={1} />

            <List type="movie" query="now_playing" pages={1} />
            <List type="tv" query="on_the_air" pages={1} />

            <List type="movie" query="popular" pages={1} />
            <List type="tv" query="popular" pages={1} />
          </div>
        </div>

        <BottomNav />
      </section>
    </main>
  );
};

export default Home;
