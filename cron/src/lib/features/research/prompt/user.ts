export function createResearchUserPrompt(category: string) {
  return `
Research specific AI use cases for people seeking life improvement solutions in the "${category}" category.

## Research Target:
**Category**: ${category}

## Research Objectives:
I need you to identify 6 specific, actionable problems which people in this category are actively seeking to solve, by using AI assistants like Claude. These should be concrete, detailed issues that go beyond generic advice.

## Web Search Requirements:
**IMPORTANT**: Use web search to find the most current and relevant information about problems in the "${category}" category. Search for:
- Current social media trends and pain points
- Expected target audiences.
- Latest blog posts and articles about common challenges
- Recent survey data and research reports
- Trending searches and keywords related to the category
- Current tools and solutions people are using
- Recent news and developments affecting this category

Base your research on real, current data rather than assumptions. Each problem you identify should be backed by evidence from recent online discussions, searches, or publications.

## Research Requirements:

### 1. **Problem Specificity**
Each problem must be:
- Highly specific and actionable (not "learn English" but "create a 15-minute daily smartphone routine for improving English pronunciation using voice recognition apps")
- Include specific tools, platforms, or contexts
- Address real-world constraints (time, resources, skill level)
- Consider modern trends and behaviors

### 2. **Market Validation**
For each problem, consider:
- Current search trends and online discussions
- Social media pain points and questions
- Professional forum discussions
- Emerging technologies affecting this area
- Economic and social trends

### 3. **Solution Fit**
Each problem should:
- Require analytical thinking or content generation
- Be practical in real life scenarios

### 4. **Target Audience Context**
Consider specific demographics:
- Age groups and their technology comfort levels
- Professional backgrounds and expertise levels
- Geographic and cultural contexts
- Current life situations and challenges

## Output Requirements
Provide your research findings in a long paragraph format.

## Examples of Good Problem Specificity:

**Instead of**: "Financial planning help"
**Research**: "Create a personalized debt payoff strategy for millennials with student loans, credit card debt, and irregular freelance income using the debt avalanche method"

**Instead of**: "Relationship advice"
**Research**: "Craft tactful text messages to set boundaries with overbearing family members during holiday seasons without causing major conflicts"

**Instead of**: "Career guidance"
**Research**: "Write compelling cold outreach messages to startup founders on LinkedIn for recent computer science graduates seeking their first software engineering role"

## Focus Areas Within ${category}:
Based on the category "${category}", research problems that are:
- Trending in online communities and forums
- Discussed frequently on social media platforms
- Addressed by existing tools
- Emerging due to recent technological or social changes
- Specific to the target audience's current life stage and circumstances

Your research should uncover problems that real people are actively trying to solve, with evidence of market demand and clear opportunities for AI-powered improvement.`;
}
