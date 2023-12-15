import { prisma } from '../utils/prisma/index.js';

export class ReviewsRepository {
  readMany = async ({ sort }) => {
    const reviews = await prisma.reviews.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: sort.toLowerCase(),
      },
    });

    return reviews.map((review) => {
      const userName = review.user.name;
      delete review.user;
      return {
        ...review,
        userName,
      };
    });
  };

  readOneById = async (id) => {
    const review = await prisma.reviews.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!review) {
      throw new HttpStatus.NotFound('리뷰 조회에 실패했습니다.');
    }

    return review;
  };

  createOne = async ({ rating, content, userId }) => {
    const review = await prisma.reviews.create({
      data: { rating, content, userId },
    });

    return review;
  };

  updateOneById = async (id, { rating, content }) => {
    const review = await prisma.reviews.findUnique({ where: { id } });

    if (!review) {
      throw new HttpStatus.NotFound('리뷰 조회에 실패했습니다.');
    }

    const updateReview = await prisma.reviews.update({
      where: { id },
      data: {
        ...(rating && { rating }),
        ...(content && { content }),
      },
    });

    return updateReview;
  };

  deleteOneById = async (id) => {
    const review = await prisma.reviews.findUnique({ where: { id } });

    if (!review) {
      throw new HttpStatus.NotFound('리뷰 조회에 실패했습니다.');
    }

    const deleteReview = await prisma.reviews.delete({ where: { id } });

    return deleteReview;
  };
}
