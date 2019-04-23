
// std::map<std::string, std::vector<std::string>> textGenerator::createTable(int order, std::string txt) {

// 	int i;
// 	std::string ngram;
// 	std::map<std::string, std::vector<std::string>> ngrams; //map to hold: key:ngrams; val:a vector of characters that can possibly follow

// 	for (i = 0; i < (txt.length() - order - 1); i++) {
// 		ngram = txt.substr(i, order);
// 		ngrams[ngram].push_back(txt.substr(i + order, 1));//add to inner array characters that appear after the ngram
// 	}

// 	return ngrams;
// }


// std::string textGenerator::generateText(int order, std::string txt, std::map<std::string, std::vector<std::string>> ngrams) {

// 	int i;
// 	srand(time(NULL));	//we will need random int later

// 	std::string currentNgram = txt.substr(0, order);	//initialise to first ngram from text
// 	std::string result = currentNgram;

// 	for (i = 0; i < txt.size(); i++) {	//the stop condition exists only for debugging purposes

// 		std::vector<std::string> poss = ngrams[currentNgram]; //push all possible characters into a vector

// 		if (poss.size() == 0) {	//if the vector is empty, add an empty string as element to avoid division by 0
// 			poss.push_back("");
// 		}

// 		int randNum = (rand() % (poss.size()));	//pick one at random; note that since we have not handled du-				
// 		std::string nextChar = poss[randNum];	//plicates, chars are already weighted in the array
// 		result += nextChar;						//add the new string to the result
// 		currentNgram = result.substr(result.size() - order, order);	//set new current ngram to the last (order)
// 	}																//chars of our result
	
// 	return result;	//return result so it can be written to file
// }

class TextGenerator {
    constructor(config={}) {
        if(!config.text || config.text.length === 0) {
            this.text = "";
        } else {
            this.text = config.text;
        };
        if(typeof config.order !== "number"){
            this.order = TextGenerator.DEFAULT_ORDER;
        } else {
            this.order = config.order
        }
        if(typeof config.maxLength !== "number"){
            this.maxLength = config.text.length || TextGenerator.DEFAULT_LENGTH;
        } else {
            this.maxLength = config.maxLength;
        }
        this.ngrams = new Map();
        this.result = "";
    }
    setText(text) {
        this.text = text;
    }
    setOrder(order) {
        if(typeof order !== "number"){
            throw new Error("Invalid order passed");
        }
        this.order = order;
    }
    getText() {
        return this.text;
    }
    getResult() {
        return this.result;
    }
    createTable() {
        let ngram;
        for (let i = 0; i < this.text.length; i+=this.order-1) {
            ngram = this.text.substr(i, this.order);
            console.log(ngram);
            if(!Array.isArray(this.ngrams.get(ngram))){
                this.ngrams.set(ngram, [this.text.substr(i + this.order, 1)]);
            } else {
                const current = this.ngrams.get(ngram);
                current.push(this.text.substr(i + this.order, 1));
                this.ngrams.set(ngram, current);
            }
        }
    }
    generateText() {
        let current = this.text.substr(0, this.order);
        this.result = current;
        for (let i = 0; i < this.maxLength; i++) {
            let possible = this.ngrams.get(current);
            const index = Math.round((Math.random() * TextGenerator.RAND_MAX)) % possible.length;
            this.result += possible[index];
            current = this.result.substr(this.result.length - this.order - 1, this.order);
        }
    }
}

TextGenerator.DEFAULT_ORDER = 6;
TextGenerator.DEFAULT_LENGTH = 10000;
TextGenerator.RAND_MAX = 32767;

module.exports = TextGenerator;