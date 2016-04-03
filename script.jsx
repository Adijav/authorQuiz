(function(){
	'use strict'

	var Quiz = React.createClass({
		propTypes: {
			books: React.PropTypes.array.isRequired
		},
		render: function(){
			return(
				<div>
					{this.props.books.map(function(book){
						return <Book title={book} />;
					})};
				</div>
			);
		}
	});

	var Book = React.createClass({
		propTypes: {
			title: React.PropTypes.string.isRequired
		},
		render: function(){
			return(
				<div>
					<h2>{this.props.title}</h2>
				</div>
			)
		}
	});

	ReactDOM.render(<Quiz books={["a","b","c"]}/>,document.getElementById("container"));
})();