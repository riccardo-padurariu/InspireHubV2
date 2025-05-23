const motivationalQuotes = [
  { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "FDR" },
  { quote: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { quote: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { quote: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { quote: "Don't wait for opportunity. Create it.", author: "Unknown" },
  { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { quote: "Go the extra mile. It’s never crowded.", author: "Wayne Dyer" },
  { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { quote: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupéry" },
  { quote: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { quote: "Set your goals high, and don’t stop until you get there.", author: "Bo Jackson" },
  { quote: "If you want something you've never had, you must be willing to do something you've never done.", author: "Thomas Jefferson" },
  { quote: "When you feel like quitting, think about why you started.", author: "Unknown" },
  { quote: "A little progress each day adds up to big results.", author: "Satya Nani" },
  { quote: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Unknown" },
  { quote: "Don’t stop until you’re proud.", author: "Unknown" },
  { quote: "Success doesn’t come from what you do occasionally, it comes from what you do consistently.", author: "Marie Forleo" },
  { quote: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { quote: "We are what we repeatedly do. Excellence, then, is not an act but a habit.", author: "Aristotle" },
  { quote: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { quote: "Small disciplines repeated with consistency every day lead to great achievements.", author: "John Maxwell" },
  { quote: "Motivation gets you going, but discipline keeps you growing.", author: "John C. Maxwell" },
  { quote: "Fall in love with the process and the results will come.", author: "Eric Thomas" },
  { quote: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { quote: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
  { quote: "Champions keep playing until they get it right.", author: "Billie Jean King" },
  { quote: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { quote: "Failure is not the opposite of success, it’s part of success.", author: "Arianna Huffington" },
  { quote: "I’ve failed over and over and over again in my life. And that is why I succeed.", author: "Michael Jordan" },
  { quote: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
  { quote: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "Only those who dare to fail greatly can ever achieve greatly.", author: "Robert F. Kennedy" },
  { quote: "Fear is temporary. Regret is forever.", author: "Unknown" },
  { quote: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
  { quote: "Mistakes are proof that you are trying.", author: "Jennifer Lim" },
  { quote: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
  { quote: "Your mindset determines your future.", author: "Unknown" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "Confidence comes not from always being right but from not fearing to be wrong.", author: "Peter T. McIntyre" },
  { quote: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
  { quote: "Success is 90% mindset, 10% strategy.", author: "Tony Robbins" },
  { quote: "Don’t limit your challenges. Challenge your limits.", author: "Jerry Dunn" },
  { quote: "If you change the way you look at things, the things you look at change.", author: "Wayne Dyer" },
  { quote: "Be so confident in who you are that no one’s opinion, rejection, or behavior can shake you.", author: "Unknown" },
  { quote: "Once your mindset changes, everything on the outside will change along with it.", author: "Steve Maraboli" },
  { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { quote: "Learn as if you will live forever, live like you will die tomorrow.", author: "Mahatma Gandhi" },
  { quote: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { quote: "You don’t grow when you’re comfortable.", author: "Unknown" },
  { quote: "If you’re not willing to learn, no one can help you. If you’re determined to learn, no one can stop you.", author: "Zig Ziglar" },
  { quote: "Growth is painful. Change is painful. But nothing is as painful as staying stuck somewhere you don’t belong.", author: "Mandy Hale" },
  { quote: "Be not afraid of growing slowly, be afraid only of standing still.", author: "Chinese Proverb" },
  { quote: "Life begins at the end of your comfort zone.", author: "Neale Donald Walsch" },
  { quote: "The beautiful thing about learning is nobody can take it away from you.", author: "B.B. King" },
  { quote: "Invest in your mind. It pays the best interest.", author: "Benjamin Franklin" },
  { quote: "Work hard in silence. Let success make the noise.", author: "Frank Ocean" },
  { quote: "Hustle beats talent when talent doesn't hustle.", author: "Ross Simmonds" },
  { quote: "Dreams don’t work unless you do.", author: "John C. Maxwell" },
  { quote: "Great things never come from comfort zones.", author: "Neil Strauss" },
  { quote: "If you want to achieve greatness, stop asking for permission.", author: "Unknown" },
  { quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { quote: "There are no shortcuts to any place worth going.", author: "Beverly Sills" },
  { quote: "The dream is free. The hustle is sold separately.", author: "Unknown" },
  { quote: "Don’t wish it were easier. Wish you were better.", author: "Jim Rohn" },
  { quote: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  { quote: "Perseverance is not a long race; it is many short races one after another.", author: "Walter Elliot" },
  { quote: "You just can’t beat the person who never gives up.", author: "Babe Ruth" },
  { quote: "Tough times never last, but tough people do.", author: "Robert H. Schuller" },
  { quote: "Keep going. Everything you need will come to you at the perfect time.", author: "Unknown" },
  { quote: "Storms make trees take deeper roots.", author: "Dolly Parton" },
  { quote: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { quote: "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.", author: "Rikki Rogers" },
  { quote: "The comeback is always stronger than the setback.", author: "Unknown" },
  { quote: "Rock bottom became the solid foundation on which I rebuilt my life.", author: "J.K. Rowling" },
  { quote: "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.", author: "Henry Ford" },
  { quote: "You are the only one who can limit your greatness.", author: "Unknown" },
  { quote: "Believe in yourself and all that you are.", author: "Christian D. Larson" },
  { quote: "Never underestimate the power you have to take your life in a new direction.", author: "Germany Kent" },
  { quote: "You have within you right now, everything you need to deal with whatever the world throws at you.", author: "Brian Tracy" },
  { quote: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { quote: "The difference between who you are and who you want to be is what you do.", author: "Unknown" },
  { quote: "Don’t compromise yourself. You’re all you’ve got.", author: "Janis Joplin" },
  { quote: "Be fearless in the pursuit of what sets your soul on fire.", author: "Jennifer Lee" },
  { quote: "Make yourself proud.", author: "Unknown" },
  { quote: "Own your story, love yourself through it.", author: "Brené Brown" },
  { quote: "Make it happen.", author: "Unknown" },
  { quote: "Keep moving forward.", author: "Unknown" },
  { quote: "Done is better than perfect.", author: "Unknown" },
  { quote: "You got this.", author: "Unknown" },
  { quote: "Stay focused and never give up.", author: "Unknown" },
  { quote: "Progress, not perfection.", author: "Unknown" },
  { quote: "Be the energy you want to attract.", author: "Unknown" },
  { quote: "Success starts with self-discipline.", author: "Unknown" },
  { quote: "Rise and grind.", author: "Unknown" },
  { quote: "You were born to do this.", author: "Unknown" }
];


function randomize(array){
    for(let i=0;i<6;i++){
    const randIndex = Math.floor(Math.random() * 100);
    const t = motivationalQuotes[randIndex].quote;
    const a = motivationalQuotes[randIndex].author;
    const obj = {text: t, auth: a};
    array.push(obj);
    }
  }

function getQuote(){
  const randIndex = Math.floor(Math.random() * 100);
  const t = motivationalQuotes[randIndex].quote;
  const a = motivationalQuotes[randIndex].author;
  const obj = {text: t, auth: a};
  return obj; 
}

export { randomize,getQuote };
