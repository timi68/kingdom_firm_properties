/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/global/footer";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay} from "swiper";
import {slideImages} from "../../lib/data";
import {Button} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";

function Login() {
	SwiperCore.use([Autoplay]);

	return (
		<React.Fragment>
			<div className="auth login-container">
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
				<div className="auth-wrapper login-wrapper">
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
									Hi, Welcome Back
								</div>
								<div className="form-control">
									<label
										htmlFor="username"
										className="form-control-label"
									>
										<span className="label-text">
											Email*
										</span>
									</label>
									<input
										type="text"
										id="username"
										placeholder="Enter your username"
										name="username"
										className="text-control username"
									/>
								</div>
								<div className="form-control">
									<label
										htmlFor="username"
										className="form-control-label"
									>
										<span className="label-text">
											Password*
										</span>
									</label>
									<input
										type="password"
										id="username"
										placeholder="Enter your password"
										name="username"
										className="text-control username"
									/>
								</div>
								<div className="action-control">
									<Button
										color="primary"
										variant="contained"
										type="button"
										fullWidth
										className="submit-btn"
										id="submit-form"
									>
										<span>Login</span>
									</Button>
								</div>
								<div className="register-link link">
									<div className="text">
										<span>
											Don't have an account ?{"   "}
											<span>
												<Link href="/register" passHref>
													<a href="#">
														{" "}
														Create Account
													</a>
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

export default Login;
