import React, { useState, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { getArticlesByAuthorName } from "../../api/article";
import ArticleListItem from "../../components/ArticleListItem/ArticleListItem";
import { Link } from "react-router-dom";

const Stories = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		getArticles();
	}, []);

	const getArticles = async () => {
		const result = await getArticlesByAuthorName();
		console.log(result);
		setArticles(result?.data);
	};

	const showArticles = () => {
		return (
			<div>
				{articles?.map((article, index) => {
					return (
						<Link to={`/read/${article._id}`}>
							<ArticleListItem
								key={index}
								articleImg={"left"}
								headingFont={"small"}
								article={article || {}}
							/>
						</Link>
					);
				})}
			</div>
		);
	};
	{
		return <Container>{showArticles()}</Container>;
	}
};

export default Stories;
