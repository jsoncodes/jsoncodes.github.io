---
comments: true
date: 2010-11-12 11:36:33+00:00
layout: post
slug: 3d-particle-system-for-xna
title: 3D Particle System for XNA
wordpress_id: 204
tags:
- 3D Graphics
- c#
- sample
- xna
---

I’m currently working on a 3D XNA 3.1 (need to use 3.1 for the third party library we are using at the minute) game for a piece of coursework at university and decided I would implement a 3D particle system in order to create some cool explosion effects.  This system is very similar to the particle system I described in my [previous article](http://www.jason-mitchell.com/index.php/2010/11/11/2d-particle-system-for-xna/) since I basically lifted a load of code from there.  Since this is simply for a piece of coursework, I didn’t implement the full feature set that can be found in my 2D particle system because:




  1. I wanted to keep it lightweight and not include unnecessary functions


  2. In the future I want to combine my particle systems together


(See end of article for download)

**UPDATE: _I’ve added a download to an XNA 4 version of this particle system_**

<!-- more --> For this 3D system, I didn’t implement the concept of [emitters and forces](http://www.jason-mitchell.com/index.php/2010/11/11/2d-particle-system-for-xna/) and instead chose to simply implement the default functions for these directly in my particle effect class as these would fit my needs perfectly and also reduce the complexity of the system.  I’m not going to walk through the processes to use this project since it’s virtually identically to the previous article but I just want to highlight the differences between 2D and 3D in drawing the particles.

Naturally in 2D I just used SpriteBatch and it met all my needs, however in 3D I had to create my own quad class called TextureQuad which uses VertexPositionTexture objects as the vertices.  The process of applying a texture to a set of four VertexPositionTexture objects should at least be vaguely familiar to anyone who has started looking at 3D development using [XNA](http://create.msdn.com).  If you aren’t familiar with this, I would recommend taking a look at Riemer Grootjan’s [sample](http://www.riemers.net/eng/Tutorials/XNA/Csharp/Series2/Textures.php) to see how this is done.

My basic TextureQuad class looks like:


    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;

    namespace Particles
    {
        public class TextureQuad
        {
            private static readonly Vector2 UpperLeft = new Vector2(0, 0);
            private static readonly Vector2 UpperRight = new Vector2(1, 0);
            private static readonly Vector2 BottomLeft = new Vector2(0, 1);
            private static readonly Vector2 BottomRight = new Vector2(1, 1);

            private readonly VertexBuffer vertexBuffer;
            private readonly VertexDeclaration vertexDeclaration;
            private readonly BasicEffect effect;

            public TextureQuad(GraphicsDevice graphicsDevice, Texture2D texture, int width, int height)
            {
                VertexPositionTexture[] vertices = CreateQuadVertices(width, height);
                vertexBuffer = new VertexBuffer(graphicsDevice, VertexPositionTexture.SizeInBytes * vertices.Length, BufferUsage.WriteOnly);
                vertexBuffer.SetData(vertices, 0, vertices.Length);

                vertexDeclaration = new VertexDeclaration(graphicsDevice, VertexPositionTexture.VertexElements);
                effect = new BasicEffect(graphicsDevice, null) { TextureEnabled = true, Texture = texture};
            }

            private static VertexPositionTexture[] CreateQuadVertices(int width, int height)
            {
                int halfWidth = width / 2;
                int halfHeight = height / 2;

                VertexPositionTexture[] vertices = new VertexPositionTexture[4];

                vertices[0] = new VertexPositionTexture(new Vector3(-halfWidth, halfHeight, 0), UpperLeft);
                vertices[1] = new VertexPositionTexture(new Vector3(halfWidth, halfHeight, 0), UpperRight);
                vertices[2] = new VertexPositionTexture(new Vector3(-halfWidth, -halfHeight, 0), BottomLeft);
                vertices[3] = new VertexPositionTexture(new Vector3(halfWidth, -halfHeight, 0), BottomRight);

                return vertices;
            }

            public void Draw(GraphicsDevice graphicsDevice, Matrix viewMatrix, Matrix projectionMatrix, Matrix worldMatrix)
            {
                graphicsDevice.VertexDeclaration = vertexDeclaration;

                effect.World = worldMatrix;
                effect.Projection = projectionMatrix;
                effect.View = viewMatrix;

                effect.Begin();
                foreach (EffectPass pass in effect.CurrentTechnique.Passes)
                {
                    pass.Begin();
                    graphicsDevice.Vertices[0].SetSource(vertexBuffer, 0, VertexPositionTexture.SizeInBytes);
                    graphicsDevice.DrawPrimitives(PrimitiveType.TriangleStrip, 0, 2);
                    pass.End();
                }
                effect.End();
            }

            public float Alpha
            {
                get { return effect.Alpha; }
                set { effect.Alpha = value; }
            }
        }
    }


It’s not hugely complicated and is essentially just an reusable approach to the sample I linked to on Riemer Grootjan’s site.  One issue I encountered using this approach is best described using an image so here it is:

![](http://www.jason-mitchell.com/images/particles.jpg)

This really bugged me for a bit since there’s no use in using transparent textures if we will always see what would appear to be the quad the texture is applied to.  Thankfully, [@BobTheCBuilder](http://www.twitter.com/bobthecbuilder) was able to point out that this was simply because the particles are unordered and advised me to set the DepthBufferWriteEnable property on the graphics device render state to false to solve the issue.  And it did:

![](http://www.jason-mitchell.com/images/particlesWorking.png)

As promised, here’s the download link: [http://www.jason-mitchell.com/uploads/particles_xna4.zip](http://www.jason-mitchell.com/uploads/particles_xna4.zip)
