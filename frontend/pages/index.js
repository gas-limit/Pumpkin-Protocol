import Head from "next/head";
import Link from "next/link";
import { Button } from "@mantine/core";
export default function Home() {
  return (
    <>
      <main className="main">
        <section className="home container" id="home">
          <div className="swiper home-swiper">
            <div className="swiper-wrapper">
              <section className="swiper-slide">
                <div className="home__content grid">
                  <div className="home__group">
                    <img
                      src="https://assets.codepen.io/7773162/about-img.png"
                      alt=""
                      className="home__img"
                    />
                    <div className="home__indicator"></div>
                    <div className="home__details-img">
                      <h4 className="home__details-title">
                      Invest in all of blockchain with one token
                      </h4>
                      <span className="home__details-subtitle">
                      Save your time and money
                      </span>
                    </div>
                  </div>
                  <div className="home__data">
                    <h3 className="home__subtitle"></h3>
                    <h1 className="home__title">
                      Cryptocurrencies unite, <br />
                      create a spooky <br />
                      index in sight!{" "}
                    </h1>
                    <p className="home__description">
                      Create your perfect portfolio with ease - customize and
                      rebalance your index token with just a few clicks. Take
                      control of your investments like never before.{" "}
                    </p>
                    <div className="home__buttons">
                      <Link href="/create-index-token">
                        <Button color="dark" radius="md" size="lg">
                          Create Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

{/*}
              <section className="swiper-slide">
                <div className="home__content grid">
                  <div className="home__group">
                    <img
                      src="https://assets.codepen.io/7773162/home1-img.png"
                      alt=""
                      className="home__img"
                    />
                    <div className="home__indicator"></div>
                    <div className="home__details-img">
                      <h4 className="home__details-title">The Labu “Reiza”</h4>
                      <span className="home__details-subtitle">
                        The Living Pumpkin
                      </span>
                    </div>
                  </div>
                  <div className="home__data">
                    <h3 className="pumpkin__subtitle">
                      #2 Top Scariest Ghost 2020
                    </h3>
                    <h1 className="home__title">
                      UOOOO <br /> TRICK OR <br /> TREAT!!{" "}
                    </h1>
                    <p className="home__description">
                      Hi I&apos;m Reiza, people call me “The Labu” currently
                      I&apos;m trying to learn something new, building my own
                      bike with parts only made from Malaysia.{" "}
                    </p>
                    <div className="home__buttons">
                      <Link href="/create-index-token">
                        <Button color="red" radius="md" size="lg">
                          Create Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
              */}


              {/* <section className="swiper-slide">
                <div className="home__content grid">
                  <div className="home__group">
                    <img
                      src="https://assets.codepen.io/7773162/home3-img.png"
                      alt=""
                      className="home__img"
                    />
                    <div className="home__indicator"></div>
                    <div className="home__details-img">
                      <h4 className="home__details-title">Captain Sem</h4>
                      <span className="home__details-subtitle">
                        Veteran Spooky Ghost
                      </span>
                    </div>
                  </div>
                  <div className="home__data">
                    <h3 className="home__subtitle">#3 Top Scariest Ghost</h3>
                    <h1 className="home__title">
                      RESPAWN <br /> THE SPOOKY <br /> SKULL{" "}
                    </h1>
                    <p className="home__description">
                      In search for cute little puppy, Captain Sem has come back
                      from his tragic death. With his hogwarts certified power
                      he promise to be a hero for all of ghostkind.{" "}
                    </p>
                    <div className="home__buttons">
                      <Link href="/create-index-token">
                        <Button color="red" radius="md" size="lg">
                          Create Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section> */}

            
              
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </section>

        {/* Section Category */}
        {
          <section className="section category">
            <h1 className="section__title">Popular Indexes by Sector </h1>
            <div className="category__container container grid">
              <div className="category__data">
                <img
                  src="https://assets.codepen.io/7773162/category1-img.png"
                  alt=""
                  className="category__img"
                />
                <h3 className="category__title">Metaverse Index</h3>
                <p className="category__description">
                  Composition: APE, ICP, STX, MANA, THETA, AXS, SAND
                </p>
              </div>
              <div className="category__data">
                <img
                  src="https://assets.codepen.io/7773162/category2-img.png"
                  alt=""
                  className="category__img"
                />
                <h3 className="category__title">DeFi Pulse Index</h3>
                <p className="category__description">
                  Composition: UNI, LINK, MKR, FXS, SNX, CAKE, CRV, CVX, DYDX,
                  YFI, COMP
                </p>
              </div>
              <div className="category__data">
                <img
                  src="https://assets.codepen.io/7773162/category3-img.png"
                  alt=""
                  className="category__img"
                />
                <h3 className="category__title">Liquid Staking Index</h3>
                <p className="category__description">
                  STETH, RETH, FRXETH, MSOL, SAVAX, AKRETH
                </p>
              </div>
            </div>
          </section>
        }

        <section className="section about" id="about">
          <div className="about__container container grid">
            <div className="about__data">
              <h2 className="section__title about__title">
                Integrated with Spookyswap
              </h2>

              <p className="about__description">
                Our platform seamlessly integrates with SpookySwap, a leading
                decentralized exchange for trading cryptocurrencies. With
                SpookySwap&apos;s secure and efficient trading infrastructure,
                you can easily buy and sell the underlying tokens that compose
                your custom index, and rebalance your portfolio whenever you
                want.{" "}
              </p>

              {/*}  <Link href="/create-index-token">
                <Button color="dark" radius="md" size="lg">
                  Buy on SpookySwap
                </Button>
              </Link>
  */}
            </div>
            <img
              //   src="https://assets.codepen.io/7773162/about-img.png"
              src="https://1999239926-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MXi8tZ-Fm6oya_e72FM-887967055%2Fuploads%2FCdq58vMyUSRRlBvn0nkS%2FMark%20-%20Colored.svg?alt=media&token=c7f79d77-1a47-4383-a96e-206df81033e9"
              alt=""
              className="about__img"
            />
          </div>
        </section>

        <section className="section discount">
          <div className="discount__container container grid">
            <div className="discount__data">
              <h2 className="discount__title">
                Check out our project links! <br />{" "}
              </h2>

                <a href="https://testnet.ftmscan.com/address/0x89d25B5Dd46Faab9D4cF506ae46675B6E6180546">FTMScan Explorer</a> <br/>
                <a href="https://github.com/JoshWeb3/Pumpkin-Protocol">Github Repository</a> <br/>
                <a href="https://pumpkin-protocol-fantom.vercel.app/">Deployment Link</a>

              {/* <Link href="/create-index-token">
               <Button color="dark" radius="md" size="lg">
                  Create Now
                </Button>
              </Link>*/}
            </div>
            <img
              src="https://assets.codepen.io/7773162/discount-img.png"
              alt=""
              className="discount__img"
            />
          </div>
        </section>

        {/* <section className="section new" id="view-token">
          <h2 className="section__title">Some Popular Index Tokens</h2>
          <div className="new__container container">
            <div className="swiper new-swiper">
              <div className="swiper-wrapper">
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new1-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Haunted House</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$14.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new2-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Halloween Candle</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$11.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new3-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Witch Hat</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$4.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new4-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Rip</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$24.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new5-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Terrifying Crystal Ball</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$5.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new6-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Witch Broom</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$7.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <Link href="#" className="scrollup" id="scroll-up">
        &uarr;
      </Link>
    </>
  );
}
