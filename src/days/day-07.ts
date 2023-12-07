import { BaseDay } from '../day';

type Hand = {
  cards: Card[];
  bid: number;
};

const CardScores1 = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const CardScores2 = {
  J: 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  T: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const HandTypes = {
  FiveOfAKind: 7,
  FourOfAKind: 6,
  FullHouse: 5,
  ThreeOfAKind: 4,
  TwoPair: 3,
  OnePair: 2,
  HighCard: 1,
};

type HandType = keyof typeof HandTypes;

export const typeForCards1 = (cards: Card[]): HandType => {
  const cardCounts = cards.reduce<Partial<Record<Card, number>>>((acc, c) => {
    const count = acc[c] || 0;
    acc[c] = count + 1;

    return acc;
  }, {});

  const counts = Object.values(cardCounts).sort().reverse();

  if (counts[0] === 5) return 'FiveOfAKind';
  if (counts[0] === 4) return 'FourOfAKind';
  if (counts[0] === 3 && counts[1] === 2) return 'FullHouse';
  if (counts[0] === 3) return 'ThreeOfAKind';
  if (counts[0] === 2 && counts[1] === 2) return 'TwoPair';
  if (counts[0] === 2) return 'OnePair';
  return 'HighCard';
};

export const realTypeForCards2 = (cards: Card[]): HandType => {
  const type1 = typeForCards1(cards);
  const type2 = typeForCards2(cards);
  if (HandTypes[type1] > HandTypes[type2]) return type1;
  return type2;
};
export const typeForCards2 = (cards: Card[]): HandType => {
  const cardCounts = cards.reduce<Partial<Record<Card, number>>>((acc, c) => {
    const count = acc[c] || 0;
    acc[c] = count + 1;

    return acc;
  }, {});

  const jokerCounts = cardCounts.J || 0;
  delete cardCounts.J;

  const counts = Object.values(cardCounts).sort().reverse();

  if (counts[0] + jokerCounts === 5) return 'FiveOfAKind';
  if (counts[0] + jokerCounts === 4) return 'FourOfAKind';
  if (counts[0] + counts[1] + jokerCounts === 5) return 'FullHouse';
  if (counts[0] + jokerCounts === 3) return 'ThreeOfAKind';
  if (counts[0] + counts[1] + jokerCounts === 4) return 'TwoPair';
  if (counts[0] + jokerCounts === 2) return 'OnePair';
  return 'HighCard';
};
export type Card = keyof typeof CardScores1;
type Input = Hand[];
export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n').map((line) => {
      const parts = line.split(' ');

      const cards = [...parts[0]] as Card[];
      const bid = parseInt(parts[1]);
      const type = typeForCards1(cards);

      return { cards, bid, type };
    });
  }

  async partOne(): Promise<number> {
    const sorted = this.input
      .map((hand) => {
        return { ...hand, type: typeForCards1(hand.cards) };
      })
      .sort((a, b) => {
        const aScore = HandTypes[a.type];
        const bScore = HandTypes[b.type];
        if (aScore !== bScore) {
          return aScore - bScore;
        }

        for (let i = 0; i < a.cards.length; i++) {
          const cardAScore = CardScores1[a.cards[i]];
          const cardBScore = CardScores1[b.cards[i]];
          if (cardAScore !== cardBScore) {
            return cardAScore - cardBScore;
          }
        }
        // istanbul ignore next
        return 0;
      });

    const scores = sorted.map((hand, index) => {
      return hand.bid * (index + 1);
    });
    return scores.reduce((sum, score) => sum + score);
  }

  async partTwo(): Promise<number> {
    const sorted = this.input
      .map((hand) => {
        return { ...hand, type: realTypeForCards2(hand.cards) };
      })
      .sort((a, b) => {
        const aScore = HandTypes[a.type];
        const bScore = HandTypes[b.type];
        if (aScore !== bScore) {
          return aScore - bScore;
        }

        for (let i = 0; i < a.cards.length; i++) {
          const cardAScore = CardScores2[a.cards[i]];
          const cardBScore = CardScores2[b.cards[i]];
          if (cardAScore !== cardBScore) {
            return cardAScore - cardBScore;
          }
        }
        // istanbul ignore next
        return 0;
      });

    const scores = sorted.map((hand, index) => {
      return hand.bid * (index + 1);
    });
    return scores.reduce((sum, score) => sum + score);
  }
}

export default Day;
