import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/home/Hero";
import { Lineup } from "@/components/home/Lineup";
import { Statement } from "@/components/home/Statement";
import { DailyPanel } from "@/components/home/DailyPanel";
import { BakeryRail } from "@/components/home/BakeryRail";
import { GlutenPanel } from "@/components/home/GlutenPanel";
import { PhotoMarquee } from "@/components/home/PhotoMarquee";
import { Channels } from "@/components/home/Channels";
import { DropList } from "@/components/home/DropList";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Hero />
      <Lineup />
      <DailyPanel />
      <Statement />
      <GlutenPanel />
      <BakeryRail />
      <PhotoMarquee />
      <Channels />
      <DropList />
    </>
  );
}
