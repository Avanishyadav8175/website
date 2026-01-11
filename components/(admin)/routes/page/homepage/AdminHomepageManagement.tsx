"use client";

import FrontendHomePage from "@/components/pages/(frontend)/Home/HomePage";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function AdminHomepageManagement({}: {}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <section className="h-full flex items-stretch justify-stretch">
      {/* LEFT SIDE ---------------------------------------------------------- */}
      <div className="overflow-auto overflow-y-scroll scrollbar-hide relative pb-16 pl-3 pr-8">
        <div className="z-30 sticky top-0 w-full h-8 bg-gradient-to-b from-white from-10% to-transparent" />
        <FrontendHomePage data={[]} />

        {/* <div className="sticky bottom-0 w-full h-8 bg-gradient-to-t from-white from-10% to-transparent" /> */}
      </div>

      {/* RIGHT SIDE ---------------------------------------------------------- */}
      <div
        className={`border-l border-charcoal-3/25 pl-5 flex flex-col justify-start gap-2 transition-all duration-200 ${open ? "max-w-[300px] min-w-[300px]" : "max-w-[58px] min-w-[58px]"}`}
      >
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="transition-all duration-300 w-fit cursor-pointer rounded-full p-2 hover:bg-charcoal-3/15 bg-charcoal-3/5"
        >
          <ArrowLeft
            strokeWidth={1.5}
            width={22}
            height={22}
            className={`transition-all duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          />
        </div>

        <div
          className={`relative overflow-y-scroll scrollbar-hide transition-all duration-300 pb-16 ${open ? "opacity-100" : "opacity-0"}`}
        >
          <div className="sticky top-0 w-full h-8 bg-gradient-to-b from-white from-10% to-transparent" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ullam
          dolorem nisi odit atque maxime doloribus dolorum tempore omnis
          sapiente harum cupiditate dicta magni voluptatum, esse dolores ipsam
          corporis modi? Dolor recusandae harum, odit iste veniam fugiat itaque
          esse maiores reprehenderit cum saepe? Incidunt aut placeat magni
          delectus nulla magnam perferendis nostrum exercitationem aliquid
          accusamus blanditiis, voluptatum aliquam, amet sapiente. Quo quis,
          odio, culpa vel facere consectetur praesentium quasi iste vitae ipsum
          ab totam? Nam exercitationem, aperiam, eligendi iste minima hic quidem
          placeat voluptate repellendus aspernatur illo reprehenderit accusamus
          quod? Rerum exercitationem ut autem maiores expedita. Eos officia,
          explicabo cumque optio consequatur laudantium eveniet laborum impedit
          placeat ducimus facilis neque repudiandae sunt deserunt eligendi earum
          dignissimos praesentium ex ea fugit! Ducimus assumenda quaerat quis
          natus? Corporis atque, error, suscipit animi dignissimos quos
          asperiores beatae qui sequi modi eveniet, fuga aliquid in aperiam
          quibusdam laborum exercitationem velit aspernatur hic maiores natus!
          Eos, fugiat omnis! Cumque provident sint adipisci velit ab corporis
          assumenda quaerat est quo voluptatibus soluta tenetur deserunt
          ratione, exercitationem commodi dolor omnis quos enim. Laudantium
          neque consequatur dolore nesciunt? Cum fuga similique animi
          voluptatibus architecto aliquam facilis ipsa tenetur aspernatur
          laboriosam consequuntur officiis numquam esse culpa, adipisci earum
          obcaecati vero beatae velit iste reiciendis debitis. Error iusto
          architecto facere. Sint, accusamus, voluptatibus debitis nulla
          delectus voluptates natus vel quis blanditiis quidem ea cumque amet
          enim doloribus odio, perspiciatis dolor quibusdam suscipit nesciunt
          consectetur impedit laboriosam saepe voluptas! Nam, dolor? Perferendis
          magnam quo veritatis atque? Maiores, tenetur sunt sed omnis maxime,
          quibusdam vel reprehenderit corrupti explicabo laudantium
          exercitationem velit quam? Optio, vel cumque modi laudantium nesciunt
          perspiciatis eius quas ex. Eos velit excepturi doloribus magnam
          asperiores ut nostrum? Ab quas cum sapiente veritatis qui ipsum dicta
          deleniti, exercitationem a iste. At pariatur inventore quas corporis
          itaque facere nisi, quos asperiores? Quasi animi molestias tenetur
          rerum magni modi totam aliquid nihil consectetur explicabo in aut,
          provident velit cupiditate iste placeat id illo similique pariatur
          unde exercitationem blanditiis architecto facilis sit. Necessitatibus.
          Sit tempore reiciendis obcaecati repellat ea temporibus officiis
          exercitationem saepe nisi asperiores eos quidem maxime quos odio odit
          provident eaque ab id in, illo ipsam. Nisi laudantium voluptates non
          atque. Quaerat libero veritatis quos dignissimos, laborum quibusdam
          exercitationem vero perferendis ipsam voluptate iusto a placeat
          doloremque maxime sunt adipisci minima! Adipisci qui, laboriosam vero
          iusto quasi mollitia distinctio. Natus, nam! Assumenda ea vero quasi,
          deserunt perspiciatis illum aliquid recusandae. Cumque commodi ex
          vitae error asperiores voluptatum! Praesentium nam fugiat illo. Labore
          cum consequuntur assumenda autem ea facere voluptatibus placeat
          ratione. Praesentium, ipsam commodi. Modi alias eum adipisci quis
          accusamus doloremque obcaecati ut esse quae cum doloribus, et quasi
          blanditiis perferendis ducimus quod. Nemo eos totam tempore culpa ex
          quibusdam veritatis! Eaque veritatis quidem incidunt corporis ex enim
          amet repellendus laudantium id culpa repellat laboriosam modi quasi
          consequuntur inventore, nobis ut nesciunt ab similique tempore
          reiciendis at odio? Pariatur, asperiores incidunt. Asperiores magnam
          iste magni nemo numquam fugiat, maxime rerum animi. Adipisci
          accusantium commodi delectus. Aliquam eos eum, dolor eveniet beatae
          non soluta sunt et amet recusandae consequatur, repellat odit iusto!
          Velit sed quae doloribus nisi illo eligendi amet eveniet, nobis rerum
          tenetur repellendus sit consequatur quas possimus facere ipsum placeat
          ea quis, aliquid culpa libero! Consectetur mollitia maiores maxime
          rem. Porro dignissimos maiores nulla amet libero magnam eaque officia
          itaque expedita eligendi, veritatis error deserunt, saepe, laudantium
          assumenda atque repellendus dicta aliquid voluptas aperiam corrupti
          molestias sunt quibusdam. Dignissimos, nobis. Adipisci perferendis
          veritatis consequatur labore, iure quas deserunt animi minima odio,
          consequuntur, in quae. Fuga, adipisci. Architecto molestiae aspernatur
          eaque pariatur distinctio repudiandae, voluptatum similique. Tempora
          tempore corrupti eaque nobis!
        </div>
      </div>
    </section>
  );
}
