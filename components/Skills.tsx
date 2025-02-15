import React from 'react'
import { skills } from '@/lib/skills'
import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import AutoScroll from 'embla-carousel-auto-scroll'

export default function Skills() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true
        }}
        plugins={[
          AutoScroll({ 
            playOnInit: true,
            speed: 1,
            direction: 'forward'
          })
        ]}
        className="w-full"
      >
        <CarouselContent className="flex">
          {skills.map((skill) => (
            <CarouselItem key={skill.name} className="basis-1/4 md:basis-1/6">
              <Badge
                title={skill.name}
                className="flex items-center justify-center gap-2 p-3 w-full"
              >
                <skill.icon className="text-3xl" style={{ color: skill.color }} />
              </Badge>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}