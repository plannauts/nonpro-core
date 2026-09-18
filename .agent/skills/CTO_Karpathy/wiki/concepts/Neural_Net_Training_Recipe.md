# A Recipe for Training Neural Networks

> **Summary**: A disciplined, battle-tested process formulated by Andrej Karpathy to systematically develop, debug, and optimize neural networks while avoiding the pitfalls of silent failure and leaky abstractions.

---

## 1. The Two Foundational Principles
1. **Neural Net Training is a Leaky Abstraction**:
   - High-level libraries (e.g., 30-line Keras/PyTorch scripts) create the false illusion that deep learning is plug-and-play. Deviation from standard datasets inevitably breaks assumptions. Backpropagation and batch norm do not magically solve ungrounded architectures.
2. **Neural Net Training Fails Silently**:
   - Unlike standard software that crashes on bugs (syntax errors, null pointers), broken neural networks often compile and train cleanly while silently performing suboptimally.
   - The error surface is vast and logical: unaligned data augmentation, flipped labels, off-by-one autoregressive offsets, or bad initial bias settings.

## 2. The 6-Step Systematic Recipe

### Step 1: Become One with the Data
- Do not touch neural net code initially. Spend hours manually scanning thousands of raw examples.
- Inspect class distributions, label corruptions, outliers, duplicate samples, and spatial/temporal variances.
- Developing qualitative intuition prevents designing inappropriate network architectures.

### Step 2: Set Up the Skeleton + Dumb Baselines
- Build an end-to-end training and evaluation pipeline with a trivial model (e.g., linear classifier).
- **Core rules**:
  - *Fix random seeds* to remove stochastic variation.
  - *Disable all bells and whistles* (e.g., turn off data augmentation at first).
  - *Verify loss at initialization*: E.g., for a softmax with $N$ classes, verify initial loss equals $-\ln(1/N)$.
  - *Visualize right before the net*: Decode the exact input tensor going into `model(x)` into visualizations. This is the only unambiguous source of truth.

### Step 3: Overfit
- **"Don't be a hero"**: Resist the temptation to invent exotic architectures early on. Copy-paste the simplest established architecture (e.g., ResNet-50) from related literature.
- **Overfit a single batch**: Train on 2 to 4 samples and ensure the network can drive training loss to zero and achieve perfect predictions. If it cannot overfit a single batch, there is a fundamental bug in the gradient pipeline.

### Step 4: Regularize
- Once training capacity is proven, trade training loss for validation generalization.
- Strategies in priority order:
  - Add more real data (the only guaranteed monotonic improvement).
  - Data augmentation (and domain randomization/simulation).
  - Pretrained representations.
  - Dropout, weight decay, early stopping, and smaller model footprints.

### Step 5: Tune
- Conduct random hyperparameter searches rather than grid searches (since neural nets are typically sensitive to only a subset of dimensions).
- Tune learning rate schedules last; start with a conservative Adam default ($3\times 10^{-4}$).

### Step 6: Squeeze Out the Juice
- Model ensembling (guarantees ~2% accuracy boosts).
- Knowledge distillation and prolonged training runs.

## 3. Connections & Context
- [[Software_2_0]] - The systematic recipe for engineering weights rather than code.
- [[First_Principles_AI]] - The overarching philosophy of defensive, paranoid, and bottom-up engineering.
- [[Andrej_Karpathy]] - Author and practitioner.

---

## Sources & References
- [[../sources/20190425_recipe_for_training_neural_networks|20190425_recipe_for_training_neural_networks.md (Personal Blog)]]
