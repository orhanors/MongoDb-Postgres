import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./index.scss";

import { IoLogoTwitter, IoLogoLinkedin, IoLogoFacebook } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import Reactions from "../../components/Reactions/Reactions";
import { getArticleById } from "../../api/article";
import { publishReview } from "../../api/review";
class Read extends Component {
	state = {
		review: { text: "", user: "orhanors" },
		article: {},
	};

	handleReviewChange = (e) => {
		const newReview = { ...this.state.review };
		newReview.text = e.target.value;
		this.setState({ review: newReview });
	};

	handleReviewSubmit = async () => {
		const articleId = this.props.match.params.slug;
		const result = await publishReview(articleId, this.state.review);
		if (result?.success) {
			const newReview = { ...this.state.review };
			newReview.text = "";
			this.setState({ review: newReview });
		}
		console.log("revi result", result);
	};
	getArticle = async () => {
		const article = await getArticleById(this.props.match.params.slug);

		this.setState({ article: article.data });
	};
	componentDidMount() {
		this.getArticle();
	}
	render() {
		const { article } = this.state;
		return (
			<Container className='article-container'>
				<h1>{article?.headLine}</h1>
				<Row style={{ marginTop: 20, marginBottom: 20 }}>
					<Col xs={1}>
						<Image
							style={{ width: 50, height: 50 }}
							src={this.state.article?.author?.img}
							roundedCircle
						/>
					</Col>
					<Col>
						{article?.author?.name}
						<p>Sep 23, 2018 · 3 min read</p>
					</Col>
					<Col>
						<div
							style={{
								fontSize: 24,
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-end",
							}}>
							<IoLogoTwitter />
							<IoLogoLinkedin />
							<IoLogoFacebook />
							<IoBookmarkOutline />
						</div>
					</Col>
				</Row>
				<p>{article?.content}</p>

				<Reactions
					textValue={this.state.review.text}
					handleReviewSubmit={this.handleReviewSubmit}
					handleReviewChange={this.handleReviewChange}
				/>
			</Container>
		);
	}
}

export default withRouter(Read);
