# First Principles AI

> **Summary**: Andrej Karpathy's core engineering and pedagogical philosophy: stripping away high-level abstractions, building minimal reference implementations from scratch, and inspecting raw data and gradients directly to achieve true bottom-up mastery.

---

## 1. Core Tenets

### 1. "What I Cannot Create, I Do Not Understand"
- Inspired by Richard Feynman, Karpathy champions building foundational algorithms entirely from scratch without external dependencies or opaque abstractions.
- Rather than calling PyTorch or Hugging Face black-box libraries, he demonstrates that mastering AI requires understanding every tensor operation, matrix multiplication, and backward pass line-by-line.

### 2. "Become One with the Data"
- The first step in deep learning is never writing neural net code—it is spending hours directly viewing, sorting, and feeling raw data distributions, label corruptions, and outliers.
### 3. Beware of Leaky Abstractions
- Deep learning fails silently. Code will run, Loss will decrease, but models may subtly fail due to misconfigured offsets or unverified augmentations.
- True progress requires paranoid, defensive engineering: fixing random seeds, checking initial analytical loss values ($-\ln(1/N)$), and overfitting a single batch of 2-4 examples before scaling.

### 4. "Try a BB Gun Before Reaching for the Bazooka"
- Resist reaching for complex, high-capacity deep models or brittle reinforcement learning setups before establishing trivial, deterministic, or simple evolutionary baselines (e.g., Cross-Entropy Method before Deep RL).

---

## 2. Benchmark Open-Source Implementations
Karpathy has created a legendary curriculum of minimalist educational projects that have trained a generation of AI researchers:

| Project | Description | Lines of Code | Key Takeaway |
| :--- | :--- | :--- | :--- |
| **`Pong from Pixels`** | ATARI Pong agent trained from raw pixels via [[Policy_Gradients]] | ~130 lines of Python/numpy | Proves deep RL works end-to-end without black-box RL libraries |
| **`micrograd`** | Minimal scalar-valued autograd engine and neural network | ~100 lines of Python | Demystifies backpropagation and computational graphs |
| **`makemore`** | Autoregressive character-level language model library | ~200-500 lines | Bridges bigrams, MLPs, CNNs, RNNs, and WaveNet |
| **`nanoGPT`** | The simplest, fastest repository for training/finetuning medium GPTs | Clean PyTorch | The definitive reference for the Transformer architecture |
| **`llm.c`** | Training LLMs in pure C/CUDA without PyTorch dependencies | Pure C99 / CUDA | Strips away Python overhead; brings AI execution close to bare metal |

---

## 3. Connections & Context
- [[Neural_Net_Training_Recipe]] - The practical procedural blueprint of First Principles AI.
- [[Policy_Gradients]] - Minimalist derivation and implementation of reinforcement learning.
- [[Software_2_0]] - The epistemological framework recognizing optimization as programming.
- [[LLM_Wiki]] - Applying first-principles simplicity to personal knowledge management.
- [[Andrej_Karpathy]] - Advocate, author, and educator.

---

## Sources & References
- [[../sources/20160531_deep_rl_pong_from_pixels|20160531_deep_rl_pong_from_pixels.md]]
- [[../sources/20190425_recipe_for_training_neural_networks|20190425_recipe_for_training_neural_networks.md]]
- [[../sources/20171112_software_2_0|20171112_software_2_0.md]]
- [[../sources/20231122_intro_to_llms_and_llm_os|20231122_intro_to_llms_and_llm_os.md]]
