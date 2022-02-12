import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Link from "next/link";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

const linksArray = [
	{
		title: "Company",
		links: [
			{text: "About", url: "/"},
			{text: "Mission", url: "/"},
			{text: "Blog", url: "/"},
		],
	},

	{
		title: "Join us",
		links: [
			{text: "Be a KFP Agent", url: "/"},
			,
			{text: "Become a partner", url: "/"},

			{text: "See full Job", url: "/"},
		],
	},
	{
		title: "Location",
		links: [
			{text: "Lagos", url: "/"},
			,
			{text: "Abuja", url: "/"},
			,
			{text: "Rivers", url: "/"},
		],
	},
	{
		title: "Transparency",
		links: [
			{text: "Terms & Conditions", url: "/"},
			{text: "Privacy Policy", url: "/"},
			{text: "Cookie Policy", url: "/"},
		],
	},
];

function Footer({children}: {children?: React.ReactNode}) {
	return (
		<div className="footer page-footer">
			<div className="footer-wrapper">
				<div className="footer-form-wrapper">
					<div className="title">
						<div className="text">GET REAL TIME MARKET INSIGHT</div>
					</div>
					<form action="#" className="form-group register-email">
						<div className="form-control">
							<input
								type="text"
								className="text-control inputbox"
								role="searchbox"
								autoComplete="new-search"
								placeholder="Search for City, Neighbourhood..."
							/>
							<button
								role="search"
								className="search-btn"
								id="search-trigger"
							>
								<SearchRoundedIcon fontSize="medium" />
							</button>
						</div>
					</form>
				</div>
				<div className="about-text">
					<div className="about-text-wrapper">
						<div className="company-logo">
							<div className="title">
								<span>Kingdom Propperties</span>
							</div>
						</div>
						<div className="text">
							<p>
								The Kingdom Properties launched 2021, for easy
								flex. Getting homes closer to the needy,
								limiting stress , meeting budgets, previewing
								home views and bringing it to existence.
							</p>
							<p>
								You can to do much here by exploring, try
								finding what meets your budget, and you can even
								be part of our membership, lets bring homes
								closer to the needy.
							</p>
						</div>
					</div>
					<div className="service">
						<div className="title">
							<span>Who We Are ?</span>
						</div>
						<div className="service-list">
							<div className="stack tags-row">
								<Chip label="AGENTS" className="chip" />
								<Chip label="LINKERS" className="chip" />
								<Chip
									label="ESTATE MANAGEMENT"
									className="chip"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="navigation-container">
					<div className="navigation-link-list-wrapper">
						<ul className="link-list-group">
							{linksArray.map((li, index) => {
								return (
									<li
										className="link-subgroup wrap"
										key={index}
									>
										<div className="subgroup-wrapper">
											<div className="link-title">
												<span>{li.title}</span>
											</div>
											<div className="external-links-group">
												{li.links.map((a, index) => {
													return (
														<div
															className="link-wrap"
															key={index}
														>
															<Link
																passHref
																href={a.url}
															>
																<a
																	href="#"
																	className="link"
																>
																	<span>
																		{a.text}
																	</span>
																</a>
															</Link>
														</div>
													);
												})}
											</div>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className="flex-wrap">
					<div className="connect-container">
						<div className="title">Connect with us</div>
						<div className="icons-list">
							<li className="link email">
								<a href="mailto:oderindejames02@gmail.com">
									<IconButton className="icon">
										<EmailIcon
											fontSize="medium"
											className="icon"
										/>
									</IconButton>
								</a>
							</li>
							<li>
								<a
									href="https://facebook.com/Kingdom_properties1"
									className="facebook-link"
								>
									<IconButton size="medium" className="icon">
										<FacebookIcon fontSize="medium" />
									</IconButton>
								</a>
							</li>
							<li>
								<a
									href="https://wa.me/+2347064239637"
									className="whatsapp-link"
								>
									<IconButton size="medium" className="icon">
										<WhatsAppIcon fontSize="medium" />
									</IconButton>
								</a>
							</li>
							<li>
								<a
									href="https://instagram.com/Kingdom_properties1"
									className="instagram-link"
								>
									<IconButton size="medium" className="icon">
										<InstagramIcon fontSize="medium" />
									</IconButton>
								</a>
							</li>
							<li>
								<a
									href="https://twitter.com/Kingdom_properties1"
									className="twitter-link"
								>
									<IconButton size="medium" className="icon">
										<TwitterIcon fontSize="medium" />
									</IconButton>
								</a>
							</li>
							<li>
								<a href="#" className="linkedIn">
									<IconButton size="medium" className="icon">
										<LinkedInIcon fontSize="medium" />
									</IconButton>
								</a>
							</li>
						</div>
					</div>
					<div className="bottom-text copyright-wrapper">
						<div className="help-text">
							<p>
								If you are using a screen reader, or having
								trouble reading this website, please call KFP
								Customer Support for help at 09017241037.
							</p>
							<p>
								(C) 2021 Kingdom Firm Properties Limited (RC:
								1701822) All Rights Reserved. All text,
								graphics, video files, code, downloadable
								material, and other works on this website are
								the copyrighted works of Kingdon Firm Properties
								Limited. All Rights Reserved. Any unauthorized
								redistribution or reproduction of any
								copyrighted materials on this website is
								strictly prohibited.
							</p>
						</div>
						<div className="copyright">
							<div className="text">
								<b>(C) 2022 Kingdom Firm Properties Limited</b>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
