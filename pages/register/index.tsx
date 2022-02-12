/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/global/footer";
import {TextField} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay} from "swiper";
import {slideImages} from "../../lib/data";
import {Button} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";

function Register() {
	return (
		<React.Fragment>
			<div className="auth register-container">
				<Swiper
					spaceBetween={0}
					slidesPerView={1}
					loop={true}
					autoplay={{delay: 5000, disableOnInteraction: false}}
				>
					{slideImages.map((image, index) => {
						return (
							<SwiperSlide className="swiper-slide" key={index}>
								<Image
									priority
									layout="fill"
									src={image.url}
									alt={image.caption}
									className="swiper-image"
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
				<div className="auth-wrapper register-wrapper">
					<div className="logo-wrapper">
						<Link passHref href="/">
							<a
								href="#"
								className="logo"
								style={{
									display: "flex",
									alignItems: "center",
									fontSize: "1.5em",
									fontWeight: 600,
								}}
							>
								<HouseIcon style={{fontSize: 20}} />
								KFP
							</a>
						</Link>
					</div>
					<div className="section form-box">
						<form action="" className="form-group login-form">
							<div className="form-wrapper">
								<div className="form-label">
									<div className="primary-text">
										Hi, Welcome
									</div>
									<div className="secondary-text">
										Sign up by filling the form below
									</div>
								</div>
								<div className="form-control">
									<label
										htmlFor="username"
										className="form-control-label"
									>
										<span className="label-text">
											Username*
										</span>
									</label>
									<input
										type="text"
										id="username"
										placeholder="Enter username"
										name="username"
										className="text-control username"
									/>
								</div>
								<div className="form-control">
									<label
										htmlFor="email"
										className="form-control-label"
									>
										<span className="label-text">
											Email*
										</span>
									</label>
									<input
										type="email"
										id="email"
										placeholder="Enter a valid email"
										name="email"
										className="text-control email"
									/>
								</div>
								<div className="form-control">
									<label
										htmlFor="password"
										className="form-control-label"
									>
										<span className="label-text">
											Password*
										</span>
									</label>
									<input
										type="text"
										id="password"
										placeholder="Enter password"
										name="password"
										className="text-control username"
									/>
								</div>
								<div className="action-control">
									<Button
										type="button"
										variant="contained"
										fullWidth
										color="primary"
										className="submit-btn"
										id="submit-form"
									>
										<span>Sign up</span>
									</Button>
								</div>
								<div className="register-link link">
									<div className="text">
										<span>
											Have an account ? {"  "}
											<span>
												<Link href="/login" passHref>
													<a href="#"> Login</a>
												</Link>
											</span>
										</span>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default Register;
