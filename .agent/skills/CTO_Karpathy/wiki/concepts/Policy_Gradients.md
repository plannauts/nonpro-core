# Policy Gradients

> **Summary**: A principled class of Reinforcement Learning algorithms that directly optimizes policy parameters via gradient ascent on expected rewards, treating decision-making as end-to-end optimization without explicit value function tables.

---

## 1. Core Principle & Mental Model
- **Author/Origin**: Popularized and pedagogically dissected by [[Andrej_Karpathy]] in *Deep Reinforcement Learning: Pong from Pixels* (May 2016).
- **First Principles Formulation**:
  - Unlike Q-learning which models the expected return of state-action pairs ($Q(s, a)$) and derives policies indirectly, Policy Gradients directly parameterize the policy network $\pi_\theta(a \mid s)$—outputting action probabilities—and modulate gradients by the eventual reward outcome.
  - Mathematically derived from the score function gradient estimator:
    $$\nabla_\theta \mathbb{E}_{x \sim p(x \mid \theta)}[f(x)] = \mathbb{E}_{x} [f(x) \nabla_\theta \log p(x \mid \theta)]$$
    where $f(x)$ is the scalar reward (or advantage) and $\nabla_\theta \log p(x \mid \theta)$ represents the direction in parameter space that increases the probability of taking that sampled action.

---

## 2. Analogy: Supervised Learning with "Fake Labels" & Advantage
In Karpathy's pedagogical explanation, Policy Gradients can be understood as standard supervised learning with two critical differences:
1. **No Ground Truth Labels**: Instead of an expert teacher supplying true labels $y$, the agent uses the actions it sampled during rollouts as "fake labels."
2. **Advantage Modulation**: The loss for each step is multiplicatively scaled by the outcome (the advantage $A_i$):
   $$\mathcal{L} = \sum_i A_i \log p(y_i \mid x_i)$$
   - If an episode eventually won ($A_i > 0$), backprop pushes parameters to make those actions *more likely*.
   - If an episode lost ($A_i < 0$), backprop discourages those actions.

---

## 3. Pong from Pixels: The Minimalist Demonstration
- **Architecture**: A simple 2-layer fully connected network (200 hidden neurons, ReLU, sigmoid output) implemented in **130 lines of Python and numpy**.
- **Inputs**: Raw 80x80 difference frames (current frame minus previous frame) containing 6,400 raw pixel values.
- **The Credit Assignment Challenge**:
  - A game may last hundreds of frames before receiving a non-zero reward (+1 or -1). An action taken at frame 50 directly caused the winning bounce, yet intermediate actions had zero impact.
  - **Resolution by Law of Large Numbers**: Over thousands of rollouts (~8,000 episodes, 200,000 games), good decisions correlate positively with eventual wins on average, while blunders correlate with losses.

---

## 4. Enabling Non-Differentiable Computation
A critical, often overlooked utility of Policy Gradients beyond gaming:
- **Bridging Non-Differentiable Boundaries**:
  - In complex neural network architectures with discrete operations (e.g., hard attention mechanisms, memory addressing in Neural Turing Machines, or external API calls), backpropagation cannot flow through discrete sampling steps.
  - Policy Gradients treat the discrete sampling sub-module as a small stochastic policy embedded in a wider differentiable network:
    - Continuous paths are trained via standard backpropagation.
    - Discrete branching operations are trained via policy gradients, weighted by the final loss.
- **Future Implication**: Allows neural systems to interact with compilers (compilable code generation), physical SLAM systems, and internet protocols (TCP/IP).

---

## 5. Practical Engineering Heuristics
Karpathy emphasizes several pragmatic warnings:
1. *"Try a BB gun before reaching for the Bazooka"*:
   - Deep RL is notoriously sample-inefficient, slow to converge, and difficult to debug.
   - Always evaluate simpler derivative-free heuristics (e.g., Cross-Entropy Method / CEM) before deploying deep policy gradients.
2. **Variance Reduction**:
   - Normalize and discount returns ($R_t = \sum_{k} \gamma^k r_{t+k}$) to control gradient estimator variance.
3. **Trust Region Constraints**:
   - Vanilla PG can collapse if a single update steps too far into bad policy space. Use algorithms like TRPO / PPO that enforce KL-divergence constraints on policy shifts.

---

## 6. Related Concepts & Entities
- [[First_Principles_AI]] - Minimalist, from-scratch understanding without unnecessary abstractions.
- [[Software_2_0]] - Optimization-based program synthesis.
- [[Neural_Net_Training_Recipe]] - Principles of disciplined model debugging and baselining.
- [[OpenAI_Gym]] - The benchmarking environment toolkit co-developed for RL research.
- [[Andrej_Karpathy]] - Creator and author.

---

## 7. Sources
- [Deep Reinforcement Learning: Pong from Pixels (2016-05-31)](file:///c:/Users/ntaka/MyAI/persons/Andrej_Karpathy/sources/20160531_deep_rl_pong_from_pixels.md)
