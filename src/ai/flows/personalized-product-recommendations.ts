'use server';

/**
 * @fileOverview Personalized product recommendations flow.
 *
 * This flow generates personalized product recommendations for a user based on
 * their browsing history, purchase history, and wishlist.
 *
 * @remarks
 * - Uses Firebase to fetch user data.
 * - Uses a Genkit prompt to generate the recommendations.
 * - Returns a list of product IDs.
 *
 * @example
 * ```typescript
 * const recommendations = await getPersonalizedProductRecommendations({
 *   userId: 'user123',
 * });
 * ```
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationInputSchema = z.object({
  userId: z.string().describe('The ID of the user to generate recommendations for.'),
});
export type RecommendationInput = z.infer<typeof RecommendationInputSchema>;

const RecommendationOutputSchema = z.object({
  productIds: z
    .array(z.string())
    .describe('An array of product IDs that are recommended for the user.'),
});
export type RecommendationOutput = z.infer<typeof RecommendationOutputSchema>;

export async function getPersonalizedProductRecommendations(
  input: RecommendationInput
): Promise<RecommendationOutput> {
  return personalizedProductRecommendationsFlow(input);
}

const personalizedProductRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedProductRecommendationsPrompt',
  input: {schema: RecommendationInputSchema},
  output: {schema: RecommendationOutputSchema},
  prompt: `You are an expert e-commerce recommendation engine.

  Based on the user's past browsing history, purchase history, and wishlist,
  recommend products that they are likely to be interested in.

  User ID: {{{userId}}}

  Return a list of product IDs in the following JSON format:
  {
    "productIds": ["product1", "product2", "product3"]
  }`,
});

const personalizedProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedProductRecommendationsFlow',
    inputSchema: RecommendationInputSchema,
    outputSchema: RecommendationOutputSchema,
  },
  async input => {
    // TODO: Fetch user data from Firebase (browsing history, purchase history, wishlist)
    // const userData = await fetchUserData(input.userId);

    // Pass the user data to the prompt
    const {output} = await personalizedProductRecommendationsPrompt(input);
    return output!;
  }
);
