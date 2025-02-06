"use client";
import { useEffect, useRef } from 'react';

export default function PropertyGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    canvas.width = 300;
    canvas.height = 150;

    // Luigi variables
    let luigi = {
      x: 50,
      y: canvas.height - 50,
      width: 30,
      height: 40,
      jumping: false,
      jumpHeight: 0,
      maxJumpHeight: 60,
      frame: 0,
      frameCount: 0,
      direction: 1 // 1 for right, -1 for left
    };

    let coins = [];
    let score = 0;
    let gameSpeed = 2;

    // Create initial coins
    function createCoin() {
      coins.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - 60) + 30,
        radius: 8,
        rotation: 0
      });
    }

    // Draw Luigi
    function drawLuigi(x, y, frame) {
      ctx.save();
      
      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(x + luigi.width/2, y + luigi.height - 5, 15, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Luigi's body
      ctx.fillStyle = '#22c55e'; // Green color for Luigi
      
      // Body
      ctx.fillRect(x + 8, y + 15, 14, 20);
      
      // Head
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(x + 5, y, 20, 15);
      
      // Hat
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(x + 3, y + 5, 24, 5);
      
      // Face
      ctx.fillStyle = '#fde68a';
      ctx.fillRect(x + 8, y + 2, 14, 13);
      
      // Mustache
      ctx.fillStyle = '#422006';
      ctx.fillRect(x + 8, y + 10, 14, 3);
      
      // Eyes
      ctx.fillStyle = '#422006';
      ctx.fillRect(x + 12, y + 6, 3, 3);
      
      // Overalls
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(x + 8, y + 25, 14, 10);
      
      // Legs animation
      if (!luigi.jumping) {
        const legOffset = Math.sin(frame * 0.2) * 3;
        ctx.fillStyle = '#1d4ed8';
        ctx.fillRect(x + 8, y + 35, 6, 5 + legOffset);
        ctx.fillRect(x + 16, y + 35, 6, 5 - legOffset);
      } else {
        // Jumping pose
        ctx.fillStyle = '#1d4ed8';
        ctx.fillRect(x + 8, y + 35, 6, 5);
        ctx.fillRect(x + 16, y + 35, 6, 5);
      }

      ctx.restore();
    }

    // Draw coin with enhanced animation
    function drawCoin(x, y, radius, rotation) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Coin body
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * Math.abs(Math.cos(rotation)), 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Coin shine
      ctx.fillStyle = '#fef3c7';
      ctx.beginPath();
      ctx.ellipse(-radius/3, -radius/3, radius/4, radius/4, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }

    // Game loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for(let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for(let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Update Luigi position
      if (luigi.jumping) {
        if (luigi.jumpHeight < luigi.maxJumpHeight) {
          luigi.y -= 3;
          luigi.jumpHeight += 3;
        } else {
          luigi.jumping = false;
        }
      } else if (luigi.y < canvas.height - 50) {
        luigi.y += 3;
        luigi.jumpHeight = Math.max(0, luigi.jumpHeight - 3);
      }

      // Update frame count for animation
      luigi.frameCount++;
      if (luigi.frameCount % 10 === 0) {
        luigi.frame = (luigi.frame + 1) % 4;
      }

      // Draw Luigi
      drawLuigi(luigi.x, luigi.y, luigi.frameCount);

      // Update and draw coins
      for (let i = coins.length - 1; i >= 0; i--) {
        coins[i].x -= gameSpeed;
        coins[i].rotation += 0.1;
        drawCoin(coins[i].x, coins[i].y, coins[i].radius, coins[i].rotation);

        // Check collision
        const dx = coins[i].x - (luigi.x + luigi.width/2);
        const dy = coins[i].y - (luigi.y + luigi.height/2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < luigi.width/2 + coins[i].radius) {
          coins.splice(i, 1);
          score++;
          createCoin();
        }

        // Remove coins that are off screen
        if (coins[i] && coins[i].x + coins[i].radius < 0) {
          coins.splice(i, 1);
          createCoin();
        }
      }

      // Draw score with enhanced styling
      ctx.fillStyle = '#f3f4f6';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`${score}`, 10, 30);
      
      // Draw coin icon next to score
      drawCoin(35, 25, 8, performance.now() / 1000);

      animationFrameId = requestAnimationFrame(animate);
    }

    // Initialize game
    function initGame() {
      // Create initial coins
      for (let i = 0; i < 3; i++) {
        createCoin();
      }

      // Start animation
      animate();

      // Add jump event listener
      const handleJump = () => {
        if (!luigi.jumping && luigi.y === canvas.height - 50) {
          luigi.jumping = true;
          luigi.jumpHeight = 0;
        }
      };

      window.addEventListener('keydown', handleJump);
      canvas.addEventListener('click', handleJump);

      return () => {
        window.removeEventListener('keydown', handleJump);
        canvas.removeEventListener('click', handleJump);
      };
    }

    const cleanup = initGame();

    return () => {
      cleanup();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="mx-auto rounded-lg border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm"
      />
      <p className="mt-4 text-sm text-blue-100/70">Click or press any key to jump!</p>
    </div>
  );
} 