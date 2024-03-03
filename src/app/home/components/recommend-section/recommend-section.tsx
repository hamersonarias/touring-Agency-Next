"use client";
import styles from "./recommend-section.module.scss";

import Link from "next/link";
import { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import { navigationMenu } from "@/app/navigation-menu";
import CardMdHotel from "@/components/card-hotel/card-md-hotel";
import { hotels } from "@/data/hotel-data";
import classNames from "classnames";

function RecommendSection() {
  const [_, setInit] = useState<boolean>(); // Add a state for re-render
  const prevArrowRef = useRef<HTMLButtonElement>(null);
  const nextArrowRef = useRef<HTMLButtonElement>(null);

  const categories = navigationMenu
    .filter((menuLabel) => {
      if (menuLabel.label.toLowerCase() === "categories") {
        return menuLabel.subnav;
      }
    })[0]
    .subnav?.map((cat) => cat.label);

  console.log(categories);

  return (
    <section id="#recommend" className="pb-12">
      <div className="container">
        <div className={styles["section__header"]}>
          <div>
            <h2 className="s-heading">Recommended</h2>
            <p className="s-heading-subtitle">
              Interdum et malesuada fames ac ante ipsum
            </p>
          </div>

          <div>
            <select>
              {categories?.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={4}
            spaceBetween={30}
            navigation={{
              prevEl: prevArrowRef.current,
              nextEl: nextArrowRef.current
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
              bulletClass: `swiper-pagination-bullet ${styles["swiper-pagination-dot"]}`,
              bulletActiveClass: `swiper-pagination-bullet-active ${styles["swiper-pagination-custom-bullet-active"]}`
            }}
            onInit={() => setInit(true)}
          >
            {hotels.map((hotel) => {
              if (hotel.isRecommend) {
                return (
                  <SwiperSlide key={hotel.hotelId}>
                    <Link href={"#"}>
                      <CardMdHotel
                        images={hotel.images! as string[]}
                        isFavourite={hotel.isFavourite}
                        location={hotel.location}
                        rating={hotel.rating}
                        room={hotel.room}
                        totalReviews={hotel.totalReviews}
                        badge={hotel.badge}
                        name={hotel.name}
                      />
                    </Link>
                  </SwiperSlide>
                );
              }
            })}

            <div className={styles["swiper__control"]}>
              <button
                ref={prevArrowRef}
                className={styles["swiper__prev-arrow-btn"]}
              >
                <GoArrowLeft
                  className={styles["swiper__prev-arrow-btn-icon"]}
                />
              </button>
              <div
                className={classNames(
                  "swiper-pagination",
                  styles["swiper-pagination--custom"]
                )}
              ></div>
              <button
                ref={nextArrowRef}
                className={styles["swiper__next-arrow-btn"]}
              >
                <GoArrowRight
                  className={styles["swiper__next-arrow-btn-icon"]}
                />
              </button>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default RecommendSection;
