import React from "react";
import Link from "next/link";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import { fadeInUp, routeAnimation, stagger } from "../utils/animations";

const about = () => {
  return (
    <motion.section
      variants={routeAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="section about"
      id="about"
    >
      <div className="about__container container grid">
        <div className="about__data">
          <h2 className="section__title about__title">
            About Pumpkin <br /> Index{" "}
          </h2>
          <p className="about__description">
            This project was created during the Q1 Hackathon of 2023 hosted by
            Fantom. Our team identified a gap in the Fantom ecosystem - the
            absence of index tokens. After conducting thorough research, we
            developed a solution to address this need.
            <br />
            Our innovation provides a valuable contribution to the Fantom
            community by filling this gap and offering a new option for users.
            We are excited to share our project with others and look forward to
            its impact on the ecosystem.{" "}
          </p>

          <Button color="dark" radius="md" size="lg">
            See Devpost
          </Button>
        </div>
        <img
          src="https://i.ibb.co/w4b5hZt/pumpkinlogo.png"
          alt=""
          className="about__img"
        />
      </div>
    </motion.section>
  );
};

export default about;
