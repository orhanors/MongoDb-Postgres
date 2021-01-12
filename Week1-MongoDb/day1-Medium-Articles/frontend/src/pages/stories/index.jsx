import React, { useState, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { getArticlesByAuthorName } from "../../api/article";

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
			<ListGroup>
				{articles.map((article, index) => {
					return (
						<ListGroup.Item key={index}>
							<div className='d-flex justify-conten-around'>
								<img
									src={article.cover}
									className='mr-3'
									style={{ width: "40px", height: "40px" }}
								/>

								<h3 className='mr-3'>{article.headLine}</h3>

								<p>{article.author.name}</p>
							</div>
						</ListGroup.Item>
					);
				})}
			</ListGroup>
		);
	};
	{
		return <Container>{showArticles()}</Container>;
	}
};

export default Stories;
