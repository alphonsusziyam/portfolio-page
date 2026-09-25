<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const itChart = ref<HTMLCanvasElement | null>(null);
const languageChart = ref<HTMLCanvasElement | null>(null);

let itChartInstance: Chart | null = null;
let languageChartInstance: Chart | null = null;

onMounted(() => {
  if (itChart.value) {
    itChartInstance = new Chart(itChart.value, {
      type: "bar",

      data: {
        labels: [
          "HTML / CSS",
          "JavaScript / TypeScript",
          "Vue.js",
          "PHP",
          "SQL",
          "Python",
          "Systemtechnik",
          "Git",
        ],

        datasets: [
          {
            label: "Kenntnisse",
            data: [90, 85, 80, 75, 80, 65, 75, 80],
            backgroundColor: "#00e5a0",
            borderRadius: 4,
            borderWidth: 0,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },
        },

        scales: {
          x: {
            ticks: {
              color: "#999999",
              font: {
                family: "Inter",
              },
            },

            grid: {
              display: false,
            },
          },

          y: {
            beginAtZero: true,
            max: 100,

            ticks: {
              color: "#999999",
              callback: (value) => `${value}%`,
            },

            grid: {
              color: "#272727",
            },
          },
        },
      },
    });
  }

  if (languageChart.value) {
    languageChartInstance = new Chart(languageChart.value, {
      type: "bar",

      data: {
        labels: ["Deutsch", "Englisch", "Französisch", "Tamil"],

        datasets: [
          {
            label: "Sprachkenntnisse",
            data: [95, 85, 70, 100],
            backgroundColor: "#00e5a0",
            borderRadius: 4,
            borderWidth: 0,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },
        },

        scales: {
          x: {
            ticks: {
              color: "#999999",
              font: {
                family: "Inter",
              },
            },

            grid: {
              display: false,
            },
          },

          y: {
            beginAtZero: true,
            max: 100,

            ticks: {
              color: "#999999",
              callback: (value) => `${value}%`,
            },

            grid: {
              color: "#272727",
            },
          },
        },
      },
    });
  }
});

onBeforeUnmount(() => {
  itChartInstance?.destroy();
  languageChartInstance?.destroy();
});
</script>

<template>
  <main class="page">
    <section class="page-hero">
      <div class="container">
        <p class="section-label">03 / SKILLS</p>

        <h1>
          Meine
          <span>Kompetenzen.</span>
        </h1>

        <p class="page-intro">
          Ein Überblick über meine technischen Fähigkeiten und Sprachkenntnisse.
        </p>
      </div>
    </section>

    <section class="skills-page">
      <!-- IT SKILLS -->
      <div class="chart-section">
        <div class="container">
          <div class="chart-header">
            <span>01</span>

            <div>
              <p class="section-label">TECHNOLOGIEN</p>
              <h2>IT-Kenntnisse</h2>
            </div>
          </div>

          <div class="chart-container">
            <canvas ref="itChart"></canvas>
          </div>
        </div>
      </div>

      <!-- LANGUAGES -->
      <div class="chart-section">
        <div class="container">
          <div class="chart-header">
            <span>02</span>

            <div>
              <p class="section-label">SPRACHEN</p>
              <h2>Sprachkenntnisse</h2>
            </div>
          </div>

          <div class="chart-container">
            <canvas ref="languageChart"></canvas>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="skill-note">
          Die dargestellten Werte dienen als visuelle Einschätzung meiner
          Kenntnisse und stellen keine formale Zertifizierung oder
          standardisierte Bewertung dar.
        </div>
      </div>
    </section>
  </main>
</template>
