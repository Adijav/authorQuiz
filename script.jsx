(function(){
	'use strict';

	var data = [
        {
            name: 'Mark Twain', 
            imageUrl: 'images/marktwain.jpg',
            books: ['The Adventures of Huckleberry Finn']
        },
        {
            name: 'Joseph Conrad',
            imageUrl: 'images/josephconrad.png',
            books: ['Heart of Darkness']
        },
        {
            name: 'J.K. Rowling',
            imageUrl: 'images/jkrowling.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Daniel Ogren',
            books: ['Harry Potter and the Sorcerers Stone']
        },
        {
            name: 'Stephen King',
            imageUrl: 'images/stephenking.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Pinguino',
            books: ['The Shining','IT']
        },
        {
            name: 'Charles Dickens',
            imageUrl: 'images/charlesdickens.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['David Copperfield', 'A Tale of Two Cities']
        },
        {
            name: 'William Shakespeare',
            imageUrl: 'images/williamshakespeare.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
        }
    ];

    data.game = function() {
    	var books = _.shuffle(this.reduce(function(a,b,c){
    		return a.concat(b.books);
    	},[])).slice(0,4);

    	var answer = books[_.random(books.length-1)];

    	return {
    		books: books,
    		author: _.find(this,function(author){
    			return author.books.some(function (title){
    				return title === answer;
    			});
    		}),
    		checkAnswer : function(title) {
    			return this.author.books.some(function(t){
    				return t === title;
    			});
    		}
    	};
    };

	var Quiz = React.createClass({
		getInitialState: function(){
			return _.extend({
				colorBackground:"default",
				showContinue: false
			},this.props.data.game());
		},
		handleBookSelected: function(title){
			var correctAnswer = this.state.checkAnswer(title);
			this.setState({
				colorBackground: correctAnswer ? 'green' : 'red',
				showContinue: correctAnswer
			});
		},
		handleContinue: function() {
			this.setState(this.getInitialState());
		},
		render: function(){
			return(
				<div>
					<div className="row">
						<div className="col-lg-2 col-lg-offset-5">
							<img className="img-responsive" src={this.state.author.imageUrl}/>
						</div>
						<div className="col-lg-6 col-lg-offset-3">
							{this.state.books.map(function(b){
								return (
								<div className="books">
									<Book title={b} onBookSelected={this.handleBookSelected} key={b}/>
								</div>
								)
							},this)}
						</div>
						<div className={"col-lg-1 resultBox " + this.state.colorBackground}>
						</div>
						{this.state.showContinue ? (<div className="col-lg-1 continueButton"><button onClick={this.handleContinue} className="btn btn-primary">Continue</button></div>):<span></span>}
					</div>
				</div>
			);
		}
	});

	var Book = React.createClass({
		handleClick: function() {
			this.props.onBookSelected(this.props.title);
		},
		render: function(){
			return(
				<div onClick={this.handleClick}>
					<div>{this.props.title}</div>
				</div>
			);
		}
	});

	ReactDOM.render(<Quiz data={data}/>,document.getElementById("root"));
})();