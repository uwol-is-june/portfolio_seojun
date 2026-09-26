import HoverImageReveal from "@/components/originkit/ui/hover-image-reveal";

const items = {
  itemCount: 5,
  item1: { text: "NEW SEASON DROP", image: { src: "/originkit/hover-1.jpg" } },
  item2: { text: "ESSENTIAL COLLECTION", image: { src: "/originkit/hover-2.jpg" } },
  item3: { text: "SUMMER EDITION", image: { src: "/originkit/hover-3.jpg" } },
  item4: { text: "STREET ICONS", image: { src: "/originkit/hover-4.jpg" } },
  item5: { text: "PREMIUM DENIM", image: { src: "/originkit/hover-5.png" } },
};

export default function Home() {
  return (
    <main className="h-screen w-full">
      <HoverImageReveal items={items} />
    </main>
  );
}
