import { pricingCards } from "@/lib/constants";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import Image from "next/image";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Check } from "lucide-react";

export default function Home() {
  return (
      <main className=""> 
       <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col "> 
        <div className=" absolute bottom-0 left-0 right-0 top-0
        bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] 
        bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" /> 
        <p className="text-center text-2xl relative">Run your business, from one place</p> 
        <div>
        <div className="mt-12 bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className=" text-6xl xs:text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-x-bold text-center ">
            StackFlowAi
          </h1>
        </div>
        </div>
        <div className="flex justify-center items-center relative pt-14 md:mt-[-70px]">
          <Image 
          src={"/assets/preview.png"} 
          alt="banner image" 
          width={1200}
          height={1200} 
          className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t
          dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
       </section>
       <section className="flex justify-center  flex-col gap-4 md:!mt-20 mt-[40px]">
        <h2 className="text-4xl text-center"> 
          Choose what fits you right
        </h2>
        <p className="text-muted-foreground text-center">
          A system that grows with your business, as it helps your business grow
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map((card) => (
            //WIP: wire up free plan
            <Card 
            key={card.title}
            className={twMerge(
              "w-[300px] flex flex-col justify-between",
              clsx({
                "border-2 border-primary": card.title === "Unlimited Saas",
              })
            )}>
              <CardHeader>
                <CardTitle className={clsx('', {
                  'text-muted-foreground': card.title !== "Unlimited Saas"
                })}>{card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold text-center">
                  {card.price}
                </span>
                <span className="text-muted-foreground">
                  /m
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {card.features.map((feature) => (
                    <div key={feature} className="flex gap-2 items-center">
                      <Check className="text-primary" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Link href={`/agecny?plan=${card.priceId}`}
                className={clsx(
                  'w-full text-center bg-primary p-2 rounded-md',
                  {'!bg-muted-foreground': card.title !== "Unlimited Saas"}
                )}>
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
       </section>
      </main>
  );
}
